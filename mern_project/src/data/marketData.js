export const starterProduce = [
  { id: 'seed-tomato', name: 'Fresh tomatoes', category: 'Vegetables', variety: 'Hybrid', quantity: 450, unit: 'kg', price: 24, location: 'Pune, Maharashtra', farmer: 'Green Valley Farm', icon: '🍅', source: 'demo' },
  { id: 'seed-onion', name: 'Red onions', category: 'Vegetables', variety: 'Nashik Red', quantity: 800, unit: 'kg', price: 19, location: 'Nashik, Maharashtra', farmer: 'Nashik Growers', icon: '🧅', source: 'demo' },
  { id: 'seed-corn', name: 'Sweet corn', category: 'Vegetables', variety: 'Sweet corn', quantity: 250, unit: 'kg', price: 28, location: 'Satara, Maharashtra', farmer: 'Sunrise Fields', icon: '🌽', source: 'demo' },
  { id: 'seed-spinach', name: 'Fresh spinach', category: 'Vegetables', variety: 'Leafy greens', quantity: 120, unit: 'kg', price: 22, location: 'Thane, Maharashtra', farmer: 'Riverbend Farm', icon: '🥬', source: 'demo' },
  { id: 'seed-potato', name: 'Potatoes', category: 'Vegetables', variety: 'Table potato', quantity: 600, unit: 'kg', price: 21, location: 'Pune, Maharashtra', farmer: 'Deccan Produce Co-op', icon: '🥔', source: 'demo' },
];

export const fertilizerCatalog = [
  { id: 'urea', name: 'Urea', grade: '46-0-0', type: 'Nitrogen fertilizer', package: '45 kg bag', note: 'Use only according to soil test and crop recommendations.', icon: '🌱' },
  { id: 'dap', name: 'DAP', grade: '18-46-0', type: 'Nitrogen + phosphorus', package: '50 kg bag', note: 'Commonly used as a basal fertilizer where phosphorus is required.', icon: '🧪' },
  { id: 'mop', name: 'MOP / Potash', grade: '0-0-60', type: 'Potassium fertilizer', package: '50 kg bag', note: 'Check crop suitability and soil potassium status before use.', icon: '🪴' },
  { id: 'npks', name: 'NPK complex', grade: 'Grade varies', type: 'Compound fertilizer', package: 'Bag size varies', note: 'Select the grade based on crop, soil test, and local agronomist guidance.', icon: '🌿' },
  { id: 'compost', name: 'Compost / FYM', grade: 'Organic amendment', type: 'Organic matter', package: 'Bulk / bagged', note: 'Quality and nutrient content vary by source and maturity.', icon: '🍂' },
  { id: 'micronutrients', name: 'Micronutrient mix', grade: 'Formulation varies', type: 'Micronutrients', package: 'As labelled', note: 'Use only when deficiency is identified and follow product label directions.', icon: '🧴' },
];

export function readProduce() {
  try {
    const stored = localStorage.getItem('harvestly-produce');
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (error) {
    console.warn('Could not read saved produce listings.', error);
  }
  return starterProduce;
}

export function saveProduce(items) {
  localStorage.setItem('harvestly-produce', JSON.stringify(items));
}
