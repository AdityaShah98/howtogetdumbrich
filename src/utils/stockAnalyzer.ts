import { Trade, OptimizerResult } from '../types';
import { StockDataPoint } from '../data/sampleStockData';

/**
 * Finds the optimal trades across all stocks from a start date to maximize returns
 */
export const findOptimalTrades = (
  stockData: StockDataPoint[],
  startDate: Date,
  endDate?: Date,
  initialInvestment: number = 10000
): OptimizerResult => {
  // Filter data by date range and sort chronologically
  const startDateStr = startDate.toISOString().split('T')[0];
  const endDateStr = endDate ? endDate.toISOString().split('T')[0] : undefined;
  
  let filteredData = stockData.filter((dataPoint) => {
    if (dataPoint.date < startDateStr) return false;
    if (endDateStr && dataPoint.date > endDateStr) return false;
    return true;
  });

  // Sort by date
  filteredData = filteredData.sort((a, b) => {
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });

  // If no data available, return empty result
  if (filteredData.length === 0) {
    return {
      trades: [],
      totalReturn: 0,
      returnData: []
    };
  }

  // Get all unique dates in ascending order
  const dateSet = new Set(filteredData.map(d => d.date));
  const dates = Array.from(dateSet).sort();
  
  // Group data points by date for easy lookup
  const dateMap: Record<string, StockDataPoint[]> = {};
  filteredData.forEach(dataPoint => {
    if (!dateMap[dataPoint.date]) {
      dateMap[dataPoint.date] = [];
    }
    dateMap[dataPoint.date].push(dataPoint);
  });
  
  // Store the optimal trades
  const allTrades: Trade[] = [];
  // Track portfolio value over time
  const returnOverTime: { date: string; value: number }[] = [];
  
  // Track our current cash and investments
  let cash = initialInvestment;
  let currentInvestment: { ticker: string; shares: number; buyPrice: number; buyDate: string } | null = null;
  
  // For each date in chronological order
  for (let i = 0; i < dates.length; i++) {
    const currentDate = dates[i];
    const todaysData = dateMap[currentDate];
    
    // If we are currently invested, check if we should sell
    if (currentInvestment !== null) {
      // Use type assertion to help TypeScript understand currentInvestment is not null
      const investment = currentInvestment as NonNullable<typeof currentInvestment>;
      const currentStock = todaysData.find(d => d.ticker === investment.ticker);
      
      // If we have data for the current stock
      if (currentStock) {
        // Calculate potential profit if we sell now
        const potentialProfit = (currentStock.close - investment.buyPrice) / investment.buyPrice;
        
        // Look ahead to see if we should continue holding
        let shouldSell = true;
        for (let j = i + 1; j < Math.min(i + 10, dates.length); j++) {
          const futureDate = dates[j];
          const futureData = dateMap[futureDate];
          const futureStock = futureData.find(d => d.ticker === investment.ticker);
          
          if (futureStock && futureStock.close > currentStock.close) {
            // Found a better sell opportunity in the near future
            shouldSell = false;
            break;
          }
        }
        
        // If selling is profitable and we should sell now, sell the position
        if (potentialProfit > 0 && shouldSell) {
          const sellValue = cash * (1 + potentialProfit);
          const dollarReturn = sellValue - cash;
          
          allTrades.push({
            ticker: investment.ticker,
            buyDate: investment.buyDate,
            sellDate: currentDate,
            buyPrice: investment.buyPrice,
            sellPrice: currentStock.close,
            percentReturn: potentialProfit,
            dollarReturn
          });
          
          cash = sellValue;
          currentInvestment = null;
        }
      }
    }
    
    // If we're not invested, look for the best buy opportunity
    if (currentInvestment === null) {
      let bestBuyOpportunity: { ticker: string; buyPrice: number; expectedReturn: number } | null = null;
      
      // Check each stock's potential
      for (const stock of todaysData) {
        // Look ahead to find the potential return
        for (let j = i + 1; j < dates.length; j++) {
          const futureDate = dates[j];
          const futureData = dateMap[futureDate];
          const futureStock = futureData.find(d => d.ticker === stock.ticker);
          
          if (futureStock) {
            const potentialReturn = (futureStock.close - stock.open) / stock.open;
            
            // If this looks better than our current best opportunity, update it
            if (potentialReturn > 0 && 
                (!bestBuyOpportunity || potentialReturn > bestBuyOpportunity.expectedReturn)) {
              bestBuyOpportunity = {
                ticker: stock.ticker,
                buyPrice: stock.open,
                expectedReturn: potentialReturn
              };
            }
          }
        }
      }
      
      // If we found a good buy opportunity
      if (bestBuyOpportunity && bestBuyOpportunity.expectedReturn > 0.01) { // Min 1% threshold
        currentInvestment = {
          ticker: bestBuyOpportunity.ticker,
          shares: cash / bestBuyOpportunity.buyPrice,
          buyPrice: bestBuyOpportunity.buyPrice,
          buyDate: currentDate
        };
      }
    }
    
    // Calculate current portfolio value
    let portfolioValue = cash;
    if (currentInvestment !== null) {
      // Use type assertion to help TypeScript understand currentInvestment is not null
      const investment = currentInvestment as NonNullable<typeof currentInvestment>;
      const currentStock = todaysData.find(d => d.ticker === investment.ticker);
      if (currentStock) {
        const currentValue = cash * (1 + (currentStock.close - investment.buyPrice) / investment.buyPrice);
        portfolioValue = currentValue;
      }
    }
    
    // Record the portfolio value for this date
    returnOverTime.push({
      date: currentDate,
      value: portfolioValue
    });
  }
  
  // Calculate total return
  const totalReturn = allTrades.reduce((sum, trade) => sum + trade.percentReturn, 0);
  
  // Make sure each record has a value, interpolating if necessary
  const completeReturnData = dates.map(date => {
    const existingData = returnOverTime.find(d => d.date === date);
    if (existingData) {
      return existingData;
    }
    
    // If no data for this date, use the most recent previous value
    const previousData = returnOverTime
      .filter(d => d.date < date)
      .sort((a, b) => b.date.localeCompare(a.date))[0];
    
    return {
      date,
      value: previousData ? previousData.value : initialInvestment
    };
  });
  
  // Ensure the trades are sorted by buy date
  allTrades.sort((a, b) => {
    return a.buyDate.localeCompare(b.buyDate);
  });
  
  return {
    trades: allTrades,
    totalReturn,
    returnData: completeReturnData
  };
};

/**
 * Gets available tickers from the dataset
 */
export const getAvailableTickers = (stockData: StockDataPoint[]): string[] => {
  const tickerSet = new Set(stockData.map(item => item.ticker));
  return Array.from(tickerSet);
};

/**
 * Gets the date range available in the dataset
 */
export const getAvailableDateRange = (stockData: StockDataPoint[]): { earliest: Date; latest: Date } => {
  const dates = stockData.map(item => new Date(item.date));
  return {
    earliest: new Date(Math.min(...dates.map(d => d.getTime()))),
    latest: new Date(Math.max(...dates.map(d => d.getTime())))
  };
};

/**
 * Formats currency values
 */
export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};

/**
 * Formats percentage values
 */
export const formatPercentage = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
};
