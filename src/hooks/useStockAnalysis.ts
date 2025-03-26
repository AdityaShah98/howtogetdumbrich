import { useState, useCallback, useEffect } from 'react';
import sampleStockData, { StockDataPoint } from '../data/sampleStockData';
import { findOptimalTrades, getAvailableDateRange } from '../utils/stockAnalyzer';
import { OptimizerResult } from '../types';

export const useStockAnalysis = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [stockData, setStockData] = useState<StockDataPoint[]>(sampleStockData);
  const [result, setResult] = useState<OptimizerResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [dateRange, setDateRange] = useState<{ earliest: Date; latest: Date } | null>(null);

  // Initialize date range from available data
  useEffect(() => {
    const range = getAvailableDateRange(stockData);
    setDateRange(range);
    
    // Set default start date to the earliest date
    if (!startDate) {
      setStartDate(range.earliest);
    }
    
    // Set default end date to the latest date
    if (!endDate) {
      setEndDate(range.latest);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stockData]);

  // Calculate optimal trades whenever inputs change
  const calculateOptimalTrades = useCallback(() => {
    if (!startDate) return;
    
    setLoading(true);
    
    try {
      // Reduce the artificial delay to improve responsiveness
      setTimeout(() => {
        const result = findOptimalTrades(stockData, startDate, endDate || undefined);
        setResult(result);
        setLoading(false);
      }, 300); // Reduced artificial delay to improve user experience
    } catch (error) {
      console.error('Error calculating optimal trades:', error);
      setLoading(false);
    }
  }, [startDate, endDate, stockData]);

  return {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    stockData,
    setStockData,
    result,
    loading,
    calculateOptimalTrades,
    dateRange
  };
};
