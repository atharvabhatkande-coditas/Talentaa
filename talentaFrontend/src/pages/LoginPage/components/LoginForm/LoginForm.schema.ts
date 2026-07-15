import * as z from "zod"; 
export const loginUserSchema = z
  .object({
    otp: z.string().refine((value)=>/^\d{8}$/.test(value),"Invalid OTP format"),
  })
  
export type loginUserSchemaType = z.infer<typeof loginUserSchema>;