import { useCallback, useEffect, useState } from 'react';

const DEFAULT_LOCATION = {
  name: 'Pune',
  admin1: 'Maharashtra',
  country: 'India',
  latitude: 18.5204,
  longitude: 73.8567,
};

function describeWeather(code) {
  if (code === 0) return { label: 'Clear sky', icon: '☀️' };
  if ([1, 2].includes(code)) return { label: 'Mostly clear', icon: '🌤️' };
  if (code === 3) return { label: 'Overcast', icon: '☁️' };
  if ([45, 48].includes(code)) return { label: 'Foggy', icon: '🌫️' };
  if ([51, 53, 55, 56, 57].includes(code)) return { label: 'Drizzle', icon: '🌦️' };
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Rain', icon: '🌧️' };
  if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow', icon: '❄️' };
  if ([95, 96, 99].includes(code)) return { label: 'Thunderstorm', icon: '⛈️' };
  return { label: 'Weather update', icon: '🌤️' };
}

function formatDay(dateString) {
  return new Date(`${dateString}T12:00:00`).toLocaleDateString('en-IN', {
    weekday: 'short',
    day: 'numeric',
  });
}

function WeatherWidget() {
  const [query, setQuery] = useState('Pune');
  const [location, setLocation] = useState(DEFAULT_LOCATION);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState('');

  const loadWeather = useCallback(async (place) => {
    setLoading(true);
    setError('');
    try {
      const params = new URLSearchParams({
        latitude: String(place.latitude),
        longitude: String(place.longitude),
        current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max',
        forecast_days: '4',
        timezone: 'auto',
      });
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
      if (!response.ok) throw new Error('Weather service is temporarily unavailable.');
      const data = await response.json();
      if (!data.current || !data.daily) throw new Error('Weather data was incomplete.');
      setWeather(data);
      setLocation(place);
    } catch (err) {
      setError(err.message || 'Could not load weather. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWeather(DEFAULT_LOCATION);
  }, [loadWeather]);

  const searchLocation = async (event) => {
    event.preventDefault();
    const searchTerm = query.trim();
    if (!searchTerm) return;

    setSearching(true);
    setError('');
    try {
      const params = new URLSearchParams({
        name: searchTerm,
        count: '1',
        language: 'en',
        format: 'json',
        countryCode: 'IN',
      });
      const response = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${params}`);
      if (!response.ok) throw new Error('Could not search for that location.');
      const results = await response.json();
      if (!results.results || results.results.length === 0) {
        throw new Error('Location not found. Try a city name such as Pune or Nashik.');
      }
      const place = results.results[0];
      await loadWeather({
        name: place.name,
        admin1: place.admin1 || '',
        country: place.country || 'India',
        latitude: place.latitude,
        longitude: place.longitude,
      });
    } catch (err) {
      setError(err.message || 'Location search failed. Please try again.');
      setLoading(false);
    } finally {
      setSearching(false);
    }
  };

  const current = weather?.current;
  const daily = weather?.daily;
  const condition = current ? describeWeather(current.weather_code) : null;
  const placeLabel = [location.name, location.admin1].filter(Boolean).join(', ');

  return (
    <section className="weather-widget" aria-labelledby="weather-heading">
      <div className="weather-header">
        <div>
          <span className="eyebrow">LOCAL CONDITIONS</span>
          <h2 id="weather-heading">Farm weather</h2>
          <p>Live forecast from Open-Meteo. Check local conditions before planning field work.</p>
        </div>
        <span className="weather-source">LIVE API</span>
      </div>

      <form className="weather-search" onSubmit={searchLocation}>
        <label className="sr-only" htmlFor="weather-location">Search Indian city</label>
        <input
          id="weather-location"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Enter a city, e.g. Nashik"
          autoComplete="off"
        />
        <button className="button button-primary" type="submit" disabled={searching || !query.trim()}>
          {searching ? 'Searching…' : 'Update location'}
        </button>
      </form>

      {error && <div className="weather-error" role="alert">{error}</div>}

      {loading && !weather ? (
        <div className="weather-loading" role="status">Loading current weather…</div>
      ) : current && daily ? (
        <>
          <div className="weather-current">
            <div className="weather-condition">
              <span className="weather-icon" aria-hidden="true">{condition.icon}</span>
              <div>
                <p className="weather-place">{placeLabel}</p>
                <strong className="weather-temperature">{Math.round(current.temperature_2m)}°C</strong>
                <span className="weather-description">{condition.label}</span>
                <small>Feels like {Math.round(current.apparent_temperature)}°C</small>
              </div>
            </div>
            <div className="weather-stats">
              <div><span>Humidity</span><strong>{current.relative_humidity_2m}%</strong></div>
              <div><span>Rain now</span><strong>{current.precipitation} mm</strong></div>
              <div><span>Wind</span><strong>{Math.round(current.wind_speed_10m)} km/h</strong></div>
            </div>
          </div>

          <div className="forecast-grid">
            {daily.time.slice(1, 4).map((date, index) => {
              const dayCondition = describeWeather(daily.weather_code[index + 1]);
              return (
                <article className="forecast-day" key={date}>
                  <span>{formatDay(date)}</span>
                  <span className="forecast-icon" aria-hidden="true">{dayCondition.icon}</span>
                  <strong>{Math.round(daily.temperature_2m_max[index + 1])}° / {Math.round(daily.temperature_2m_min[index + 1])}°</strong>
                  <small>{daily.precipitation_probability_max?.[index + 1] ?? 0}% rain chance</small>
                </article>
              );
            })}
          </div>
          <p className="weather-disclaimer">
            Forecasts are estimates, not farming advice. Weather data: Open-Meteo.
          </p>
        </>
      ) : null}
    </section>
  );
}

export default WeatherWidget;
