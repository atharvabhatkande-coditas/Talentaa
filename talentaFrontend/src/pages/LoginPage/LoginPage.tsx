import { useReducer } from "react";
import RequestOTPForm from "./components/RequestOTPForm/RequestOTPForm"
import styles from "./LoginPage.module.scss"
import { initialState, reducer } from "./LoginPage.reducer";
import LoginForm from "./components/LoginForm/LoginForm";
const LoginPage = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleOTPSuccess = (email: string) => {
    dispatch({ type: "set_email", email });
    dispatch({ type: "set_page_state", changedState: "otpPage" });
  };

  return (
    <main className={styles.authLayout}>
      <section className={styles.leftPanel} />
      <section className={styles.rightPanel}>
        <div className={styles.formContainer}>
          <div>
            <h1> Welcome to Talenta</h1>
            <p className={styles.heading}>
              A One Stop Platform for your dream Job and Candidate for your company!!!
            </p>
          </div>

          {state.pageState === "emailPage" && (
            <RequestOTPForm onSuccess={handleOTPSuccess} />
          )}
          {state.pageState === "otpPage" && (
            <LoginForm email={state.email} />
          )}
        </div>
      </section>
    </main>


  )
}
export default LoginPage