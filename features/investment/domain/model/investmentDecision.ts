export interface InvestmentDecisionRequest {
  query: string;
}

export interface InvestmentDecisionResponse {
  answer: string;
  disclaimer: string;
}

export interface RawInvestmentDecisionResponse {
  query: string;
  final_response: string;
  disclaimer: string;
  iteration_count: number;
}
