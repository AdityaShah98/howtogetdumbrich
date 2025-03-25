import React from 'react';
import styled from 'styled-components';
import { Trade } from '../types';
import { formatCurrency, formatPercentage } from '../utils/stockAnalyzer';

interface TradeListProps {
  trades: Trade[];
  totalReturn: number;
}

const TradeListContainer = styled.div`
  margin-top: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

const TradeListHeader = styled.div`
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TotalReturn = styled.span`
  font-size: 1.1rem;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
`;

const TradeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.th`
  text-align: left;
  padding: 0.8rem 1rem;
  border-bottom: 2px solid #f0f0f0;
  font-weight: 600;
  color: #555;
`;

const TableCell = styled.td`
  padding: 0.8rem 1rem;
  border-bottom: 1px solid #f0f0f0;
`;

const TradeRow = styled.tr`
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f9f9f9;
  }
`;

const PositiveReturn = styled.span`
  color: #4CAF50;
  font-weight: 600;
`;

const EmptyMessage = styled.div`
  padding: 2rem;
  text-align: center;
  color: #888;
  font-style: italic;
`;

const TradeList: React.FC<TradeListProps> = ({ trades, totalReturn }) => {
  if (trades.length === 0) {
    return (
      <TradeListContainer>
        <TradeListHeader>Recommended Trades</TradeListHeader>
        <EmptyMessage>No profitable trades found for the selected date range.</EmptyMessage>
      </TradeListContainer>
    );
  }

  return (
    <TradeListContainer>
      <TradeListHeader>
        Recommended Trades
        <TotalReturn>
          Total Return: {formatPercentage(totalReturn)}
        </TotalReturn>
      </TradeListHeader>
      <TradeTable>
        <thead>
          <tr>
            <TableHeader>Stock</TableHeader>
            <TableHeader>Buy Date</TableHeader>
            <TableHeader>Buy Price</TableHeader>
            <TableHeader>Sell Date</TableHeader>
            <TableHeader>Sell Price</TableHeader>
            <TableHeader>Return %</TableHeader>
            <TableHeader>Profit</TableHeader>
          </tr>
        </thead>
        <tbody>
          {trades.map((trade, index) => (
            <TradeRow key={index}>
              <TableCell><strong>{trade.ticker}</strong></TableCell>
              <TableCell>{trade.buyDate}</TableCell>
              <TableCell>{formatCurrency(trade.buyPrice)}</TableCell>
              <TableCell>{trade.sellDate}</TableCell>
              <TableCell>{formatCurrency(trade.sellPrice)}</TableCell>
              <TableCell>
                <PositiveReturn>{formatPercentage(trade.percentReturn)}</PositiveReturn>
              </TableCell>
              <TableCell>
                <PositiveReturn>{formatCurrency(trade.dollarReturn)}</PositiveReturn>
              </TableCell>
            </TradeRow>
          ))}
        </tbody>
      </TradeTable>
    </TradeListContainer>
  );
};

export default TradeList;
