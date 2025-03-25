export interface Trade {
  ticker: string;
  buyDate: string;
  sellDate: string;
  buyPrice: number;
  sellPrice: number;
  percentReturn: number;
  dollarReturn: number;
}

export interface OptimizerResult {
  trades: Trade[];
  totalReturn: number;
  returnData: {
    date: string;
    value: number;
  }[];
}

export interface DatePickerProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  label: string;
}