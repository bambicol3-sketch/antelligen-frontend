export interface InvestorFlowTrendPoint {
  date: string;
  foreign: number;
  institution: number;
  individual: number;
}

export interface InvestorFlowTrendResponse {
  stock_code: string;
  stock_name: string | null;
  since_date: string | null;
  days: number;
  points: InvestorFlowTrendPoint[];
}
