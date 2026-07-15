import { useForm } from "react-hook-form";
import Button from "../../../../components/Button/Button";
import Form from "../../../../components/Form/Form";
import FormField from "../../../../components/FormField/FormField";
import styles from "./RequestOTPForm.module.scss"
import { zodResolver } from "@hookform/resolvers/zod";
import { requestOTPSchema, type requestOTPSchemaType } from "./RequestOTPForm.schema";
import type { RequestOTPFormProps, RequestOTPFormValues } from "./RequestOTPForm.types";
import { useRequestOTPMutation } from "../../../../store/services/auth.service";

const RequestOTPForm = ({ onSuccess }: RequestOTPFormProps) => {
  const [requestOTP, { isLoading, isError, error }] =useRequestOTPMutation();
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<requestOTPSchemaType>({ resolver: zodResolver(requestOTPSchema) })

  const onSubmit = async (data: RequestOTPFormValues) => {
    const response = await requestOTP({ email: data.email });
    console.log(response);
    
    if (response.error) {
      return;
    }
    onSuccess(data.email);

  }

  return (
    <div className={styles.requestOTPForm}>
      <p className={styles.heading}>Login</p>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormField<requestOTPSchemaType>
          name="email"
          control={control}
          label="Email:"
          error={errors.email?.message}
          inputProps={{ type: "email" }}

        />
       
        <Button variant="primary_Btn" type="submit" disabled={isLoading} >
          {isLoading ? "Sending Request..." : "Request OTP"} 
        </Button>

         {isError && (
          <p className={styles.errorText}>
            {(error as { data?: { message?: string } })?.data?.message ?? "Something went wrong."}
          </p>
        )}

      </Form>

    </div>



  )

}
export default RequestOTPForm;


