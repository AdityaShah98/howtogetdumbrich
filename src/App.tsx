import React, { useEffect, useState, lazy, Suspense } from 'react';
import styled from 'styled-components';
import DatePicker from './components/DatePicker';
import TradeList from './components/TradeList';
import ReturnChart from './components/ReturnChart';
import { useStockAnalysis } from './hooks/useStockAnalysis';
import './animations.css';

// Lazy load the SplashScreen component for better initial performance
const SplashScreen = lazy(() => import('./components/SplashScreen'));

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  opacity: 0;
  transition: opacity 0.6s ease-in;
  
  &.visible {
    opacity: 1;
  }
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
`;

const DatePickersContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const AnalyzeButton = styled.button`
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 0.8rem 2rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
  
  &:hover {
    background-color: #388E3C;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin: 2rem 0;
  font-style: italic;
  color: #666;
`;

const LoadingFallback = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #4CAF50;
  background-color: #f8f8f8;
`;

const Footer = styled.footer`
  margin-top: 4rem;
  text-align: center;
  color: #777;
  font-size: 0.9rem;
`;

// Simple app with just the essentials for the landing page
const LandingContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  max-width: 800px;
  margin: 0 auto;
`;

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [contentVisible, setContentVisible] = useState(false);
  const [showFullApp, setShowFullApp] = useState(false);
  
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    result,
    loading,
    calculateOptimalTrades,
    dateRange
  } = useStockAnalysis();

  // Handle splash screen completion
  const handleSplashComplete = () => {
    setShowSplash(false);
    // After splash screen is gone, fade in the content
    setTimeout(() => {
      setContentVisible(true);
    }, 100);
  };

  // Handle analyze button click
  const handleAnalyze = () => {
    calculateOptimalTrades();
    setShowFullApp(true);
  };

  // Initially calculate trades on component mount (for background data loading)
  useEffect(() => {
    if (startDate && !result) {
      // Silently load data in the background
      calculateOptimalTrades();
    }
  }, [startDate, result, calculateOptimalTrades]);

  if (!startDate || !endDate || !dateRange) {
    return <LoadingMessage>Loading stock data...</LoadingMessage>;
  }

  // Show splash screen if needed
  if (showSplash) {
    return (
      <Suspense fallback={<LoadingFallback className="initial-fade-in">Loading...</LoadingFallback>}>
        <SplashScreen exitSplash={handleSplashComplete} />
      </Suspense>
    );
  }

  return (
    <AppContainer className={contentVisible ? 'visible' : ''}>
      {!showFullApp ? (
        // Landing content with just the essentials
        <LandingContent>
          <Header>
            <Title>How To Get Dumb Rich</Title>
            <Subtitle>
              Find the perfect sequence of trades across all stocks to maximize returns
            </Subtitle>
          </Header>

          <DatePickersContainer>
            <DatePicker
              selectedDate={startDate}
              onDateChange={setStartDate}
              label="Start Date"
            />
            <DatePicker
              selectedDate={endDate}
              onDateChange={setEndDate}
              label="End Date"
            />
          </DatePickersContainer>

          <AnalyzeButton
            onClick={handleAnalyze}
            disabled={loading}
            className="analyze-btn-animation"
          >
            {loading ? 'Analyzing...' : 'Analyze Optimal Trades'}
          </AnalyzeButton>
        </LandingContent>
      ) : (
        // Full app content after analysis
        <>
          <Header>
            <Title>How To Get Dumb Rich</Title>
            <Subtitle>
              Find the perfect sequence of trades across all stocks to maximize returns
            </Subtitle>
          </Header>

          <DatePickersContainer>
            <DatePicker
              selectedDate={startDate}
              onDateChange={setStartDate}
              label="Start Date"
            />
            <DatePicker
              selectedDate={endDate}
              onDateChange={setEndDate}
              label="End Date"
            />
          </DatePickersContainer>

          <AnalyzeButton
            onClick={calculateOptimalTrades}
            disabled={loading}
            className="analyze-btn-animation"
          >
            {loading ? 'Analyzing...' : 'Analyze Optimal Trades'}
          </AnalyzeButton>

          {loading && <LoadingMessage>Analyzing stock data for optimal trades...</LoadingMessage>}

          {result && !loading && (
            <>
              <TradeList trades={result.trades} totalReturn={result.totalReturn} />
              <ReturnChart data={result.returnData} />
            </>
          )}

          <Footer>
            Sample data includes AAPL, MSFT, and GOOGL stocks from January 2023.
            Algorithm finds the optimal sequence of trades across all stocks, as if you could time the market perfectly.
            Results are for educational purposes only and not financial advice.
          </Footer>
        </>
      )}
    </AppContainer>
  );
}

export default App;