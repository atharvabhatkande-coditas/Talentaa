import * as z from "zod"; 
export const requestOTPSchema = z
  .object({
    email: z.string().email("Invalid email format"),
  })
  
export type requestOTPSchemaType = z.infer<typeof requestOTPSchema>;