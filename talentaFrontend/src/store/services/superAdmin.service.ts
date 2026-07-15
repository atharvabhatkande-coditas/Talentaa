import type { AddCandidatePayload, AddCandidateResponse } from "../../types/superAdmin.types"
import { baseApi } from "./baseAPI"

export const adminCRUDApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    addCandidate: builder.mutation<AddCandidateResponse, AddCandidatePayload>({
      query: (body) => ({
        url: '/api/auth/admin/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Candidates']
    }),
   
  })
})

export const {useAddCandidateMutation } = adminCRUDApi