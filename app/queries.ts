import { reduxAPI } from '@/lib/store/api/root';

export type File = {
  fileId: number;
  minioUrl: string;
  fileType: string;
};

export type UploadResponse = {
  errorCode: number;
  message: string;
  data: File;
};

export type Check = {
  name: string;
  passed: boolean;
};

export type ValidationItem = {
  score: number;
  checks: Check[];
};

export type ValidateResponse = {
  errorCode: number;
  message: string;
  validationResults: ValidationItem;
};


export const fileApi = reduxAPI.injectEndpoints({
  endpoints: (builder) => ({
    uploadFile: builder.mutation<UploadResponse, FormData>({
      query(formData) {
        return {
          url: `files/upload`,
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['FILE'],
    }),

    validateDocument: builder.mutation<ValidateResponse, { fileId: number; fileType: string }>({
      query({ fileId, fileType }) {
        return {
          url: `documents/validate`,
          method: 'POST',
          params: {
            fileId,
            fileType,
          },
        };
      },
      invalidatesTags: ['FILE'],
    }),

    askQuestion: builder.mutation<{ errorCode: number; errorMessage: string; data: string }, string>({
      query: (question) => ({
        url: 'chat',
        method: 'POST',
        body: { question },
      }),
    }),
  }),
  overrideExisting: true,
});

export const {
    useUploadFileMutation,
    useValidateDocumentMutation,
    useAskQuestionMutation, // Hook for asking questions
  } = fileApi;