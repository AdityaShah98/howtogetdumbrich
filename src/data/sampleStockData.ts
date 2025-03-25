export interface StockDataPoint {
  date: string;
  ticker: string;
  open: number;
  close: number;
  high: number;
  low: number;
  volume: number;
}

const sampleStockData: StockDataPoint[] = [
  // AAPL stock data (sample)
  { date: '2023-01-03', ticker: 'AAPL', open: 130.28, close: 125.07, high: 130.90, low: 124.17, volume: 112117500 },
  { date: '2023-01-04', ticker: 'AAPL', open: 126.89, close: 126.36, high: 128.66, low: 125.08, volume: 89113600 },
  { date: '2023-01-05', ticker: 'AAPL', open: 127.13, close: 125.02, high: 127.77, low: 124.76, volume: 80954200 },
  { date: '2023-01-06', ticker: 'AAPL', open: 126.01, close: 129.62, high: 130.29, low: 124.89, volume: 99205400 },
  { date: '2023-01-09', ticker: 'AAPL', open: 130.47, close: 130.15, high: 133.41, low: 129.89, volume: 80396200 },
  { date: '2023-01-10', ticker: 'AAPL', open: 130.26, close: 130.73, high: 131.25, low: 128.12, volume: 70790800 },
  { date: '2023-01-11', ticker: 'AAPL', open: 131.25, close: 133.49, high: 133.51, low: 130.46, volume: 69858900 },
  { date: '2023-01-12', ticker: 'AAPL', open: 133.88, close: 133.41, high: 134.26, low: 131.44, volume: 65874500 },
  { date: '2023-01-13', ticker: 'AAPL', open: 132.03, close: 134.76, high: 134.92, low: 131.66, volume: 65978800 },
  { date: '2023-01-17', ticker: 'AAPL', open: 134.83, close: 135.94, high: 137.29, low: 134.13, volume: 63926000 },
  { date: '2023-01-18', ticker: 'AAPL', open: 136.82, close: 135.21, high: 136.82, low: 134.40, volume: 63756300 },
  { date: '2023-01-19', ticker: 'AAPL', open: 134.08, close: 135.27, high: 136.25, low: 133.77, volume: 58435300 },
  { date: '2023-01-20', ticker: 'AAPL', open: 135.28, close: 137.87, high: 138.02, low: 134.84, volume: 80762200 },
  { date: '2023-01-23', ticker: 'AAPL', open: 138.12, close: 141.11, high: 143.31, low: 137.90, volume: 81427200 },
  { date: '2023-01-24', ticker: 'AAPL', open: 140.30, close: 142.53, high: 143.16, low: 140.30, volume: 56409500 },
  
  // MSFT stock data (sample)
  { date: '2023-01-03', ticker: 'MSFT', open: 243.08, close: 239.58, high: 243.95, low: 237.40, volume: 24970100 },
  { date: '2023-01-04', ticker: 'MSFT', open: 242.50, close: 229.10, high: 243.41, low: 227.88, volume: 38461900 },
  { date: '2023-01-05', ticker: 'MSFT', open: 226.63, close: 222.31, high: 227.55, low: 219.35, volume: 39091300 },
  { date: '2023-01-06', ticker: 'MSFT', open: 223.00, close: 224.93, high: 225.33, low: 219.96, volume: 35400600 },
  { date: '2023-01-09', ticker: 'MSFT', open: 227.16, close: 227.12, high: 229.05, low: 224.96, volume: 27369100 },
  { date: '2023-01-10', ticker: 'MSFT', open: 226.38, close: 228.85, high: 231.25, low: 226.37, volume: 27033800 },
  { date: '2023-01-11', ticker: 'MSFT', open: 229.08, close: 235.77, high: 235.95, low: 228.02, volume: 27780100 },
  { date: '2023-01-12', ticker: 'MSFT', open: 237.87, close: 238.51, high: 239.48, low: 234.41, volume: 22724100 },
  { date: '2023-01-13', ticker: 'MSFT', open: 235.76, close: 239.23, high: 239.37, low: 234.92, volume: 19469100 },
  { date: '2023-01-17', ticker: 'MSFT', open: 238.21, close: 240.35, high: 242.31, low: 237.80, volume: 24874000 },
  { date: '2023-01-18', ticker: 'MSFT', open: 241.70, close: 235.81, high: 242.05, low: 234.96, volume: 26411100 },
  { date: '2023-01-19', ticker: 'MSFT', open: 233.78, close: 231.93, high: 235.54, low: 230.90, volume: 21751200 },
  { date: '2023-01-20', ticker: 'MSFT', open: 233.56, close: 240.22, high: 240.43, low: 233.25, volume: 33517100 },
  { date: '2023-01-23', ticker: 'MSFT', open: 242.21, close: 242.58, high: 245.20, low: 240.42, volume: 33642900 },
  { date: '2023-01-24', ticker: 'MSFT', open: 241.42, close: 242.04, high: 243.89, low: 240.80, volume: 37216100 },
  
  // GOOGL stock data (sample)
  { date: '2023-01-03', ticker: 'GOOGL', open: 88.73, close: 87.93, high: 89.14, low: 87.34, volume: 26288500 },
  { date: '2023-01-04', ticker: 'GOOGL', open: 88.22, close: 86.02, high: 88.45, low: 85.78, volume: 29269600 },
  { date: '2023-01-05', ticker: 'GOOGL', open: 85.11, close: 85.02, high: 85.10, low: 84.05, volume: 26372800 },
  { date: '2023-01-06', ticker: 'GOOGL', open: 84.62, close: 88.16, high: 88.62, low: 84.21, volume: 31862500 },
  { date: '2023-01-09', ticker: 'GOOGL', open: 89.33, close: 88.02, high: 89.83, low: 87.62, volume: 22835300 },
  { date: '2023-01-10', ticker: 'GOOGL', open: 87.38, close: 89.24, high: 89.44, low: 87.33, volume: 24220000 },
  { date: '2023-01-11', ticker: 'GOOGL', open: 89.78, close: 92.16, high: 92.40, low: 89.41, volume: 31091700 },
  { date: '2023-01-12', ticker: 'GOOGL', open: 91.91, close: 91.52, high: 92.11, low: 90.01, volume: 29629300 },
  { date: '2023-01-13', ticker: 'GOOGL', open: 90.70, close: 91.13, high: 91.73, low: 90.32, volume: 25606400 },
  { date: '2023-01-17', ticker: 'GOOGL', open: 91.00, close: 92.10, high: 92.95, low: 90.89, volume: 25315600 },
  { date: '2023-01-18', ticker: 'GOOGL', open: 92.65, close: 91.41, high: 93.08, low: 90.78, volume: 27191800 },
  { date: '2023-01-19', ticker: 'GOOGL', open: 90.40, close: 93.05, high: 93.25, low: 90.02, volume: 34536600 },
  { date: '2023-01-20', ticker: 'GOOGL', open: 93.71, close: 98.02, high: 98.08, low: 93.32, volume: 53016300 },
  { date: '2023-01-23', ticker: 'GOOGL', open: 97.95, close: 99.28, high: 100.52, low: 97.32, volume: 44932600 },
  { date: '2023-01-24', ticker: 'GOOGL', open: 99.04, close: 99.21, high: 99.88, low: 98.18, volume: 30861100 }
];

export default sampleStockData;