import StockQuestionForm from "@/features/stock-recommendation/ui/components/StockQuestionForm";

export default function StockPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">주식 Q&A</h1>
        <p className="mb-8 text-sm text-zinc-600 dark:text-zinc-400">
          방산 관련 주식, 테마, 키워드에 관한 질문에 답변해 드릴 수 있습니다.
        </p>
        <StockQuestionForm />
      </div>
    </div>
  );
}
