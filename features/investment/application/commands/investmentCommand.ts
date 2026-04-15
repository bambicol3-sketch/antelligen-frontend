import type { InvestmentIntent } from "@/features/investment/domain/intent/investmentIntent";
import { requestInvestmentDecision } from "@/features/investment/infrastructure/api/investmentApi";

export const investmentCommand = {
  REQUEST_DECISION: (
    intent: Extract<InvestmentIntent, { type: "REQUEST_DECISION" }>
  ) => requestInvestmentDecision({ query: intent.query }),
};
