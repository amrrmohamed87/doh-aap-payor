declare type Diagnosis = {
  code: string;
  type: string;
};

declare type Clinician = {
  clinicianId: string;
};

declare type Patient = {
  age: number;
  gender: "F" | "M" | string;
};

declare type Activity = {
  code: string;
  type: string;
  net: number;
  date: string;
  priorAuthorizationID: string;
  clinician: Clinician;
};

declare type Encounter = {
  type: string;
  start: string;
  end: string;
  startType: string;
  endType: string;
};

declare type ClaimData = {
  patient: Patient;
  payorId: string;
  patientName?: string;
  patientId?: string;
  patientAge?: string;
  gender?: string;
  memberId: string;
  providerId: string;
  encounter: Encounter;
  diagnoses: Diagnosis[];
  activities: Activity[];
};

declare type ClaimQueryParams = {
  page: number;
  limit: number;
  status?: "approved" | "rejected" | "flagged";
};

declare type ClaimAnalytics = {
  totalClaims: number;
  totalUniqueProviderId: number;
  totalUniqueMemberId: number;
  totalUniquePayorId: number;
};

declare type SearchFields = {
  total: number;
  page: number;
  limit: number;
  hasMore?: boolean;
  totalPages: number;
};

declare type Flag = {
  rule?: string;
  cpt?: string;
  reason?: string;
  source: string;
  description?: string;
  message?: string;
};

declare type Reject = {
  rule: string;
  source: string;
  message: string;
};

declare type ClaimStatus = "approved" | "rejected" | "flagged";

declare type ClaimResult = {
  status: ClaimStatus;
  flags: Flag[];
  rejects: Reject[];
};

declare type CLaimDiagnosis = {
  id: number;
  code: string;
  type: string;
  poa: string | null;
};

declare type ClaimActivity = {
  id: number;
  code: string;
  type: string;
  net: number;
  date: string;
  priorAuthorizationID?: string;
};

declare type ClaimEncounter = {
  id: number;
  type: string;
  start: string;
  end: string;
  startType: string;
  endType: string;
};

declare type ClaimsData = {
  id: number;
  memberId: string;
  providerId: string;
  payorId: string;
  results: ClaimResult;
  createdAt: string;
  diagnoses: Diagnosis[];
  activities: ClaimActivity[];
  encounter: Encounter;
};

declare type ClaimsTableProps = {
  data: ClaimsData[];
  isLoadingState?: boolean;
  errorMsg?: string;
};

declare type probablilites = {
  A: number;
  F: number;
  W: number;
};

declare type tiggeredColumns = {
  activity_net?: string;
  encounter_type?: string;
};

declare type FWAData = {
  id: number;
  flaggedAs: "Abuse" | "Fraud" | "Waste" | "Unknown" | string;
  predictionCode: "A" | "F" | "W" | "Unknown" | string;
  probablilites: probablilites;
  triggerdColumns: tiggeredColumns;
  createdAt: string;
  providerId: string;
  memberId: string;
  payorId: string;
};

declare type FWAAnalytics = {
  totalFraud: number;
  totalAbuse: number;
  totalWaste: number;
  fraudProbability: number;
  abuseProbability: number;
  wasteProbability: number;
};
