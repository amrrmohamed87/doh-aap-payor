import DialogModel from "./dialog-model";

interface ResultDetailDialogProps {
  results: {
    flags?: Array<{
      cpt?: string;
      reason?: string;
      source?: string;
      description?: string;
    }>;
    status: string;
    rejects?: Array<{
      rule?: string;
      source?: string;
      message?: string;
    }>;
  };
}

export const ResultDetailDialog = ({ results }: ResultDetailDialogProps) => {
  const hasFlags = results.flags && results.flags.length > 0;
  const hasRejects = results.rejects && results.rejects.length > 0;

  return (
    <DialogModel
      triggerBtnText="View"
      tritggerBtnClassName="bg-transparent py-0 text-blue-700 hover:bg-transparent hover:text-blue-500 hover:cursor-pointer shadow-none max-w-[70px] w-[70px]"
      dialogTitle={`Claim ${
        results.status === "rejected" ? "Rejection" : "Flag"
      } Details`}
      dialogDescription="Review the issues identified with this claim"
      showConfirmBtn={false}
      dialogCancelBtnText="Close"
    >
      <div className="space-y-6 max-h-[400px] md:max-h-[600px] overflow-y-auto">
        {/* Flags Section */}
        {hasFlags && (
          <div className="space-y-3">
            <h3 className="flex items-center text-lg font-semibold text-gray-800">
              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></span>
              Flagged Items ({results.flags?.length})
            </h3>
            <div className="space-y-4">
              {results.flags?.map((flag, index) => (
                <div
                  key={`flag-${index}`}
                  className="border-l-4 border-yellow-400 pl-4 py-2 bg-yellow-50 rounded-r"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="CPT Code" value={flag.cpt} />
                    <InfoField label="Source" value={flag.source} />
                    <div className="md:col-span-2">
                      <InfoField label="Reason" value={flag.reason} />
                    </div>
                    {flag.description && (
                      <div className="md:col-span-2">
                        <InfoField
                          label="Description"
                          value={flag.description}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Rejects Section */}
        {hasRejects && (
          <div className="space-y-3">
            <h3 className="flex items-center text-lg font-semibold text-gray-800">
              <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
              Rejection Reasons ({results.rejects?.length})
            </h3>
            <div className="space-y-4">
              {results.rejects?.map((reject, index) => (
                <div
                  key={`reject-${index}`}
                  className="border-l-4 border-red-400 pl-4 py-2 bg-red-50 rounded-r"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoField label="Rule" value={reject.rule} />
                    <InfoField label="Source" value={reject.source} />
                    <div className="md:col-span-2">
                      <InfoField label="Message" value={reject.message} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!hasFlags && !hasRejects && (
          <div className="text-center py-8 text-gray-500">
            <p>No detailed information available for this claim</p>
          </div>
        )}
      </div>
    </DialogModel>
  );
};

// Helper component for consistent field display
const InfoField = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
      {label}
    </p>
    <p className="text-sm font-medium text-gray-800 mt-1">
      {value || <span className="text-gray-400">Not specified</span>}
    </p>
  </div>
);
