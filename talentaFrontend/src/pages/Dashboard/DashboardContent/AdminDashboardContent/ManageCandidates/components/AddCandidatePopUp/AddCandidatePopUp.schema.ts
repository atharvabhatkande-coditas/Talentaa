import * as z from "zod";
export const addCandidateSchema = z
  .object({
    email: z.string().email("Invalid email format"),
    role: z
      .enum(["CANDIDATE", "RECRUITER"])
      .refine(Boolean, {
        message: "Role is required",
      }),
  })

export type addCandidateSchemaType = z.infer<typeof addCandidateSchema>;
