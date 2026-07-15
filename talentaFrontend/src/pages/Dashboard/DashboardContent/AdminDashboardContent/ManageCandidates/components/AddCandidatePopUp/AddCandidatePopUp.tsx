import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../../../../../../../components/Button/Button";
import styles from "./AddCandidatePopUp.module.scss"
import { addCandidateSchema, type addCandidateSchemaType } from "./AddCandidatePopUp.schema";
import type { AddCandidatePopUpProps } from "./AddCandidatePopUp.types";
import { useForm } from "react-hook-form";
import Form from "../../../../../../../components/Form/Form";
import FormField from "../../../../../../../components/FormField/FormField";
import { useAddCandidateMutation } from "../../../../../../../store/services/superAdmin.service";
import FormSelect from "../../../../../../../components/FormSelect/FormSelect";

const AddCandidatePopUp = ({ onClose }: AddCandidatePopUpProps) => {
  const [addCandidate, { isLoading, isError, error }] = useAddCandidateMutation();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<addCandidateSchemaType>({ resolver: zodResolver(addCandidateSchema) })

  const onSubmit = async (data: addCandidateSchemaType) => {
    const response = await addCandidate({ email: data.email,role: data.role });
    console.log(response);

    if (response.error) {
      return;
    }
    onClose();


  }


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.closeButton}>
          <Button variant="close_Btn" onClick={onClose}>x</Button>
        </div>
        <div className={styles.AddCandidateForm}>
          <p className={styles.heading}>Add Candidate</p>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormField<addCandidateSchemaType>
              name="email"
              control={control}
              label="Email:"
              error={errors.email?.message}
              inputProps={{ type: "email" }}

            />
            <FormSelect<addCandidateSchemaType>
              name="role"
              control={control}
              label="Role:"
              error={errors.role?.message}
              placeholder="Select a role"
              options={[
                { label: "Candidate", value: "CANDIDATE" },
                { label: "Recruiter", value: "RECRUITER" },
              ]}
            />

            <Button variant="primary_Btn" type="submit" disabled={isLoading} >
              {isLoading ? "Adding Candidate..." : "AddCandidate"}
            </Button>

            {isError && (
              <p className={styles.errorText}>
                {(error as { data?: { message?: string } })?.data?.message ?? "Something went wrong."}
              </p>
            )}

          </Form>

        </div>




      </div>
    </div>

  )
}
export default AddCandidatePopUp;