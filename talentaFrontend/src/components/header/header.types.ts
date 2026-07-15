export type Role = "ADMIN" | "RECRUITER" | "CANDIDATE";

export interface NavData {
  label: string;
  path: string;
  allowedRoles: Role[];
}

export const navConfig: NavData[] = [
  { label: "Home Dashboard", path: "/dashboard", allowedRoles: ["ADMIN", "RECRUITER", "CANDIDATE"] },
  {label:"Browse Jobs",path:"/dashboard/browseJobs",allowedRoles:["CANDIDATE"]},
  {label:"My Applications",path:"/dashboard/myApplications",allowedRoles:["CANDIDATE"]},
  {label:"My Postings",path:"/dashboard/myPostings",allowedRoles:["RECRUITER"]},
  {label:"Post a Job",path:"/dashboard/postJob",allowedRoles:["RECRUITER"]},
  {label:"Applications",path:"/dashboard/applications",allowedRoles:["RECRUITER"]},
  {label:"Manage Candidates",path:"/dashboard/manageCandidates",allowedRoles:["ADMIN"]},
   {label:"Manage Companies",path:"/dashboard/manageCompanies",allowedRoles:["ADMIN"]},




];

