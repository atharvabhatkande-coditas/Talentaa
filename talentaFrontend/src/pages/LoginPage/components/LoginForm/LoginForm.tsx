import { useForm } from "react-hook-form";
import styles from "./LoginForm.module.scss";
import { loginUserSchema, type loginUserSchemaType } from "./LoginForm.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useReducer } from "react";
import Form from "../../../../components/Form/Form";
import Button from "../../../../components/Button/Button";
import FormField from "../../../../components/FormField/FormField";
import { initialState, reducer } from "./LoginForm.reducer";
import type { LoginFormProps, LoginFormValues } from "./LoginForm.types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../../../store/hooks";
import { useLoginMutation, useRequestOTPMutation } from "../../../../store/services/auth.service";
import { setCredentials, setUserDetails } from "../../../../store/slices/auth.slice";

const LoginForm = ({email}:LoginFormProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
   const [verifyOTP, { isLoading, isError, error }] = useLoginMutation()
  const [requestOTP, { isLoading: isResending, isError: isResendError, error: resendError }] = useRequestOTPMutation();
  const navigate = useNavigate();
  const appDispatch = useAppDispatch();
  
  const {
      control,
      handleSubmit,
      formState: { errors }
    } = useForm<loginUserSchemaType>({ resolver: zodResolver(loginUserSchema) })

  const onSubmit = async (data: LoginFormValues) => {
    const response = await verifyOTP({ email, otp: data.otp });
    console.log(response);
    if (response?.error) {
      return;
    }
    const { accessToken, refreshToken, id, role} = response.data;
    appDispatch(
      setCredentials({
        accessToken: accessToken,
        refreshToken: refreshToken,
        
      }),
    )
    appDispatch(
       setUserDetails({
        id:id,
        role:role
      })
    )
    navigate("/dashboard")
    
  };

  const handleResendButtonClick = async () => {
    const response = await requestOTP({ email });
    console.log(response);
    if (response.error) {
      return;
    }
    dispatch({ type: "set_minutes", minutes: 1 });
    dispatch({ type: "set_seconds", seconds: 0 });
    
  }

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.seconds > 0) {
        dispatch({ type: "set_seconds", seconds: state.seconds - 1 })
      }

      if (state.seconds === 0) {
        if (state.minutes === 0) {
          clearInterval(interval);
        }
        else {
          dispatch({ type: "set_seconds", seconds: 59 });
          dispatch({ type: "set_minutes", minutes: state.minutes - 1 })
        }
      }

    }, 1000);
    return () => {
      clearInterval(interval);
    }

  }, [state.seconds, state.minutes]);


  return (
    <div className={styles.loginForm}>
      <p className={styles.heading}>Verify OTP </p>

      <p className={styles.displaymsg} >
        An OTP has been sent to your mail. It is valid for 10 minutes.
      </p>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField<loginUserSchemaType>
          name="otp"
          control={control}
          label="Enter OTP:"
          error={errors.otp?.message}
          inputProps={{ type: "text" }}
        />
       
        <div className={styles.timerBasedButtonContainer}>
          <p className={styles.timer}>
            Time Remaining: <span>
              {state.minutes < 10 ? `0${state.minutes}` : state.minutes}:
              {state.seconds < 10 ? `0${state.seconds}` : state.seconds}
            </span>
            
          </p>

          <Button
            variant="secondary_Btn"
            disabled={state.seconds > 0 || state.minutes > 0}
            onClick={handleResendButtonClick}>
             {isResending ? "Resending OTP" : "Resend OTP "}
          </Button>

          {isResendError && (
            <p className={styles.errorText}>
              {(resendError as { data?: { message?: string } })?.data?.message ?? "Something went wrong."}
            </p>
          )}
        </div>

        <Button
          className={styles.loginButton}
          variant="primary_Btn"
          type="submit"
          disabled={isLoading}>
          {isLoading ? "Logging In ...":"Login"}
        </Button>

        {isError && (
          <p className={styles.errorText}>
            {(error as { data?: { message?: string } })?.data?.message ?? "Something went wrong."}
          </p>
        )}

      </Form>

    </div>
  );
};

export default LoginForm;