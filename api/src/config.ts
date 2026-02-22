export interface ApiConfig {
  apiKey: string;
}


// Validate and return configuration
export function getConfig(): ApiConfig {
const config: ApiConfig = {
  apiKey: process.env.API_KEY
};
  
  // Trim whitespace from API key
  config.apiKey = config.apiKey.trim();
  
  return config;
}
