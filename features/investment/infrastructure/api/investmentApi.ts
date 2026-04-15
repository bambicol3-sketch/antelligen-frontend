import { httpClient } from "@/infrastructure/http/httpClient";
import type { ApiResponse } from "@/infrastructure/http/apiResponse";
import type {
  InvestmentDecisionRequest,
  InvestmentDecisionResponse,
  RawInvestmentDecisionResponse,
} from "@/features/investment/domain/model/investmentDecision";

export async function requestInvestmentDecision(
  req: InvestmentDecisionRequest
): Promise<InvestmentDecisionResponse> {
  const { data } = await httpClient<ApiResponse<RawInvestmentDecisionResponse>>(
    "/api/v1/investment/decision",
    {
      method: "POST",
      body: JSON.stringify(req),
    }
  );
  return {
    answer: data.final_response,
    disclaimer: data.disclaimer,
  };
}
