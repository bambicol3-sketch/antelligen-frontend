export type InvestmentState =
  | { status: "IDLE" }
  | { status: "LOADING" }
  | { status: "SUCCESS"; answer: string; disclaimer: string }
  | { status: "ERROR"; message: string };
