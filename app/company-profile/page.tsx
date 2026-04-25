import CompanyProfileForm from "@/features/company-profile/ui/components/CompanyProfileForm";

export default function CompanyProfilePage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">기업 정보</h1>
        <p className="mb-8 text-sm text-zinc-500 dark:text-zinc-400">
          종목코드로 회사 기본 정보와 사업 개요를 조회합니다. (국내: 6자리 코드 · 미국: 티커)
        </p>
        <CompanyProfileForm />
      </div>
    </div>
  );
}
