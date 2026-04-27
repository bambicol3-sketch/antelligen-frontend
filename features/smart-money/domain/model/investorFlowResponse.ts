export interface InvestorFlowResponseItem {
  rank: number;
  stock_name: string;
  stock_code: string;
  net_buy_amount: number;
  net_buy_volume: number;
}

export interface InvestorFlowResponse {
  investor_type: string;
  date: string | null;
  items: InvestorFlowResponseItem[];
}
