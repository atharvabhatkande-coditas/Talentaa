export interface RequestOTPFormValues {
  email: string;
}

export interface RequestOTPFormProps{
  onSuccess:(email:string)=>void


}