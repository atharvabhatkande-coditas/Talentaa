export interface AddCandidatePayload{
  email:string,
  role: "CANDIDATE" | "RECRUITER";
}
export interface AddCandidateResponse{
  message:string
}