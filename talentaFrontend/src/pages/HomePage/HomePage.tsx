import { Link } from "react-router-dom";
import styles from "./HomePage.module.scss"
const HomePage = () => {
  return (
    <main className={styles.homeLayout}>
      <section className={styles.leftPanel} />
      <section className={styles.rightPanel}>
        <div className={styles.infoDataContainer}>
          <div>
            <h1> Welcome to Talenta</h1>
            <p>
              A One Stop Platform for your dream Job and Candidate for your company!!!
            </p>

            <p>
              Here Candidates build their profile an land to their dream company and recruiter can hier the best of people out there.
            </p>

          </div>
          
          <p>
            Get Started with Logging In{" "}

            <Link to="/login">Go To Login</Link>


          </p>

        </div>
      </section>
    </main>


  )
}
export default HomePage;