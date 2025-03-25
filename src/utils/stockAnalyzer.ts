import { Trade, OptimizerResult } from '../types';
import { StockDataPoint } from '../data/sampleStockData';

/**
 * Finds the optimal trades for a given stock from a start date to maximize returns
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

  // Group by ticker
  const tickerMap: Record<string, StockDataPoint[]> = {};
  filteredData.forEach(dataPoint => {
    if (!tickerMap[dataPoint.ticker]) {
      tickerMap[dataPoint.ticker] = [];
    }
    tickerMap[dataPoint.ticker].push(dataPoint);
  });

  // For each ticker, find the best buy/sell points
  const allTrades: Trade[] = [];
  const returnOverTime: { date: string; value: number }[] = [];
  
  Object.keys(tickerMap).forEach(ticker => {
    const tickerData = tickerMap[ticker];
    if (tickerData.length < 2) return; // Need at least 2 points to make a trade
    
    // Find the lowest price point
    let lowestPoint = tickerData[0];
    let highestPointAfterLowest = tickerData[0];
    
    for (let i = 0; i < tickerData.length; i++) {
      // If we find a new lowest point, update and reset highest point
      if (tickerData[i].open < lowestPoint.open) {
        lowestPoint = tickerData[i];
        highestPointAfterLowest = tickerData[i]; // Reset highest
      }
      
      // If this point is after our current lowest point and has a higher close, it's a better sell
      if (tickerData[i].date > lowestPoint.date && tickerData[i].close > highestPointAfterLowest.close) {
        highestPointAfterLowest = tickerData[i];
      }
    }
    
    // If we found a profitable trade
    if (highestPointAfterLowest.close > lowestPoint.open) {
      const percentReturn = (highestPointAfterLowest.close - lowestPoint.open) / lowestPoint.open;
      const dollarReturn = initialInvestment * percentReturn;
      
      allTrades.push({
        ticker,
        buyDate: lowestPoint.date,
        sellDate: highestPointAfterLowest.date,
        buyPrice: lowestPoint.open,
        sellPrice: highestPointAfterLowest.close,
        percentReturn,
        dollarReturn
      });
    }
  });
  
  // Sort trades by percentReturn (descending) to put best trades first
  allTrades.sort((a, b) => b.percentReturn - a.percentReturn);
  
  // Calculate total return
  const totalReturn = allTrades.reduce((sum, trade) => sum + trade.percentReturn, 0);
  
  // Create return over time data
  let cumulativeReturn = 0;
  const dateSet = new Set(filteredData.map(d => d.date));
  const dates = Array.from(dateSet).sort();
  
  dates.forEach(date => {
    const relevantTrades = allTrades.filter(trade => trade.buyDate <= date);
    cumulativeReturn = relevantTrades.reduce((sum, trade) => {
      // If we've already sold, include the full return
      if (trade.sellDate <= date) {
        return sum + trade.percentReturn;
      } 
      // If we're holding but haven't sold, estimate current return based on today's price
      else if (trade.buyDate <= date && trade.sellDate > date) {
        const todaysDataPoint = filteredData.find(d => d.date === date && d.ticker === trade.ticker);
        if (todaysDataPoint) {
          return sum + (todaysDataPoint.close - trade.buyPrice) / trade.buyPrice;
        }
      }
      return sum;
    }, 0);
    
    returnOverTime.push({
      date,
      value: initialInvestment * (1 + cumulativeReturn)
    });
  });
  
  return {
    trades: allTrades,
    totalReturn,
    returnData: returnOverTime
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
