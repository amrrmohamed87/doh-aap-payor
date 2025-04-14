import ClaimsWrapper from "@/components/claims/claims-wrapper";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function ClaimsAnalysis() {
  return (
    <section className="w-full p-1 flex flex-col gap-5 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-cyan-900 tracking-tight">
            Claim Analysis
          </h1>
          <p className="text-gray-700/70 mt-1.5 font-medium">
            Monitor claim-level activity across claims, identify high-impact
            violations, and optimize claim performance over time
          </p>
        </div>

        <Button
          variant="outline"
          size="lg"
          className="flex items-center gap-2 text-cyan-700 border-cyan-200 hover:bg-cyan-50 transition-colors hover:cursor-pointer"
        >
          Export
          <Download className="h-4 w-4" />
        </Button>
      </div>

      <ClaimsWrapper />
    </section>
  );
}
