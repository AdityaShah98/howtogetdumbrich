import React, { useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from './components/DatePicker';
import TradeList from './components/TradeList';
import ReturnChart from './components/ReturnChart';
import { useStockAnalysis } from './hooks/useStockAnalysis';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  transition: background-color 0.3s;
  width: 100%;
  
  &:hover {
    background-color: #388E3C;
  }

  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  margin: 2rem 0;
  font-style: italic;
  color: #666;
`;

const Footer = styled.footer`
  margin-top: 4rem;
  text-align: center;
  color: #777;
  font-size: 0.9rem;
`;

function App() {
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

  // Initially calculate trades on component mount
  useEffect(() => {
    if (startDate && !result) {
      calculateOptimalTrades();
    }
  }, [startDate, result, calculateOptimalTrades]);

  if (!startDate || !endDate || !dateRange) {
    return <LoadingMessage>Loading stock data...</LoadingMessage>;
  }

  return (
    <AppContainer>
      <Header>
        <Title>How To Get Dumb Rich</Title>
        <Subtitle>
          Find optimal historical stock trades to maximize your returns
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
        Results are for educational purposes only and not financial advice.
      </Footer>
    </AppContainer>
  );
}

export default App;