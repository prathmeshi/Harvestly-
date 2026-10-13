# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


## Role workspaces added

The frontend includes three role-specific demo pages:

- `/farmer` — sample produce inventory and farmer metrics.
- `/buyer` — searchable sample produce listings with session-only shortlisting.
- `/fpo` — sample member groups and consolidated buyer demand.

These pages currently use demonstration data and local UI interactions; they are not connected to a production API or database. Start the frontend from this folder with `npm install` and `npm start`.


## Live weather API integration

The Farmer workspace now includes a live weather widget powered by the [Open-Meteo Forecast API](https://open-meteo.com/en/docs) and its [Geocoding API](https://open-meteo.com/en/docs/geocoding-api).

- The widget loads current conditions and a 3-day forecast for Pune by default.
- Users can search for another Indian city, such as Nashik, and refresh the forecast.
- It displays temperature, feels-like temperature, humidity, current precipitation, wind speed, daily highs/lows, and precipitation probability.
- No API key is needed for ordinary non-commercial use. Review Open-Meteo's current terms before deploying commercially.
- Weather is fetched directly from the browser; no secret credentials are stored in the frontend.
- The widget requires an internet connection. If the service is unavailable, it displays an error instead of inventing weather values.

Weather values are forecasts and should not be treated as guaranteed conditions or professional agricultural advice.


## Additional agriculture data modules

- `/market-prices`: calls the Harvestly Express backend, which proxies the Government of India's data.gov.in commodity market dataset. Live results require an API key and resource ID in `server/.env`; until configured, the UI explicitly reports that live data is unavailable rather than showing fake prices.
- `/fertilizers`: a reference catalogue for common fertilizer types. This is not a live product feed and intentionally does not invent retail prices or stock.
- Farmer listings can be added/removed in the browser and appear in the Buyer workspace on that same browser/device. This is a demo using `localStorage`, not shared cloud storage.
- Buyer shortlists are saved locally. They do not create orders or payments.
- `/farmer` still includes the Open-Meteo weather widget.

### Start the frontend
```bash
cd mern_project
npm install
npm start
```

### Start the backend in a second terminal
```bash
cd server
npm install
```
Copy `.env.example` to `.env` and add your data.gov.in API key and market dataset resource ID. Then run:
```bash
npm start
```

Obtain a data.gov.in API key through the official portal: https://www.data.gov.in/help. The official mandi dataset describes daily wholesale minimum, maximum, and modal prices. Dataset fields and filters can vary; if the API returns no records, verify the resource ID and field names against the dataset's API page.

Official source: https://data.gov.in/resource/current-daily-price-various-commodities-various-markets-mandi
Fertilizer datasets: https://up.data.gov.in/keywords/Fertilizer
