import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useGetMeQuery } from "../../store/services/auth.service";
import { logout, setUserDetails } from "../../store/slices/auth.slice";
import { Navigate, Outlet } from "react-router-dom";

const AuthGuard=()=>{
  const appDispatch = useAppDispatch();
  const { accessToken } = useAppSelector((state) => state.auth);
  // const role = useAppSelector((state)=>state.auth.role)
  const {data, isLoading,isError}= useGetMeQuery(undefined,{skip:!accessToken});

   useEffect(() => {
    if (data) {
      appDispatch(
        setUserDetails({
          id: data.id,
          role: data.role,
          firstName:data.firstName,
          lastName:data.lastName,
          email:data.email


        })
      )
    }
    if (isError) {
      appDispatch(
        logout(),
        
      )
    }
    
  }, [data])
  console.log(data?.role);
  

  if (!accessToken) return <Navigate to={"/login"} replace />
  if(isLoading) return <p>Loading...</p>
  // if (isLoading && !role) return <p>Loading...</p>
  // if(!role) return <Navigate to={"/login"} replace />

  return <Outlet />


}
export default AuthGuard;