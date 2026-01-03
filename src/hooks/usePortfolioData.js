import portfolioData from '../data/portfolioData.json';

/**
 * Custom hook to access portfolio data
 * @returns {Object} Portfolio data from JSON
 */
export const usePortfolioData = () => {
  return portfolioData;
};
