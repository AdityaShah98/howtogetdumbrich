import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { formatCurrency } from '../utils/stockAnalyzer';

interface ReturnChartProps {
  data: {
    date: string;
    value: number;
  }[];
}

const ChartContainer = styled.div`
  margin-top: 2rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 400px;
`;

const ChartHeader = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const CustomTooltip = styled.div`
  background-color: rgba(255, 255, 255, 0.9);
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 0.75rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const TooltipLabel = styled.div`
  font-weight: bold;
  margin-bottom: 0.3rem;
`;

const TooltipValue = styled.div`
  color: #4CAF50;
`;

const CustomizedTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <CustomTooltip>
        <TooltipLabel>{label}</TooltipLabel>
        <TooltipValue>{formatCurrency(payload[0].value)}</TooltipValue>
      </CustomTooltip>
    );
  }

  return null;
};

const ReturnChart: React.FC<ReturnChartProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <ChartContainer>
      <ChartHeader>Portfolio Value Over Time</ChartHeader>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 30 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="date" 
            tickFormatter={(value) => new Date(value).toLocaleDateString()} 
            angle={-45}
            textAnchor="end"
            height={70}
          />
          <YAxis 
            tickFormatter={(value) => formatCurrency(value)}
          />
          <Tooltip content={<CustomizedTooltip />} />
          <Line 
            type="monotone" 
            dataKey="value" 
            stroke="#4CAF50" 
            strokeWidth={2} 
            dot={{ r: 3 }} 
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ReturnChart;
