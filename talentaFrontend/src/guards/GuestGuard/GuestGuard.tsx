import { Navigate} from "react-router-dom";
import type { GuestGuardProps } from "./GuestGuard.types";
import { useAppSelector } from "../../store/hooks";

const GuestGuard=({children}:GuestGuardProps)=>{
  const accessToken = useAppSelector((state) => state.auth.accessToken);

  if(accessToken) return <Navigate to="/dashboard" replace/>

  return <>{children}</>
  
}
export default GuestGuard;

