import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";
import type { RoleGuardProps } from "./RoleGuard.types";

const RoleGuard=({roles,children}:RoleGuardProps)=>{
  const role = useAppSelector((state)=>state.auth.role);
  if(!role || !roles.includes(role)) return <Navigate to={"/dashboard"} replace/>
  return <>{children}</>

}
export default RoleGuard;