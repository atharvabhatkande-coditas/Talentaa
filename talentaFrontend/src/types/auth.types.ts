export interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  id: string | null;
  role: string | null;
  firstName?:string| null;
  lastName?:string | null;
  email?:string | null
}
export interface RequestOTPPayload{
  email:string
}

export interface RequestOTPResponse{
  message:string
}

export interface LoginPayload {
  email: string;
  otp: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  id:string;
  role:string
}
export interface RefreshResponse {
  accessToken: string;
  
}


export interface LogoutPayload {
  refreshToken: string;
}

export interface LogoutResponse {
  message:string;
}
export interface MeResponse {
  id: string;
  firstName: string;
  lastName:string;
  email: string;
  role: string;
}
