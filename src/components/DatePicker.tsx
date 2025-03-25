import React from 'react';
import styled from 'styled-components';
import { DatePickerProps } from '../types';

const DatePickerContainer = styled.div`
  margin-bottom: 1rem;
`;

const DatePickerLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
`;

const DateInput = styled.input`
  padding: 0.5rem;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  width: 100%;
  transition: border-color 0.3s;
  
  &:focus {
    border-color: #4CAF50;
    outline: none;
  }
`;

const DatePicker: React.FC<DatePickerProps> = ({ selectedDate, onDateChange, label }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value) {
      onDateChange(new Date(e.target.value));
    }
  };

  // Format date as YYYY-MM-DD for input
  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  return (
    <DatePickerContainer>
      <DatePickerLabel>{label}</DatePickerLabel>
      <DateInput
        type="date"
        value={formatDateForInput(selectedDate)}
        onChange={handleChange}
      />
    </DatePickerContainer>
  );
};

export default DatePicker;
