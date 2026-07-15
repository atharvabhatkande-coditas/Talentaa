import { useState } from "react";
import Button from "../../../../../components/Button/Button";
import styles from "./ManageCandidates.module.scss"
import AddCandidatePopUp from "./components/AddCandidatePopUp/AddCandidatePopUp";
const ManageCandidates=()=>{
  const [ addCandidatePopUp, setAddCandidatePopUpOpen]=useState(false);
  return(
    <div className={styles.manageCandidatesPage}>
      <div className={styles.addCandidate}>
        <Button variant="primary_Btn" onClick={()=>setAddCandidatePopUpOpen(true)}>Add Candidate</Button>
      </div>
      {addCandidatePopUp && <AddCandidatePopUp onClose={()=>setAddCandidatePopUpOpen(false)}/>}

    </div>
    

  )
}
export default ManageCandidates;