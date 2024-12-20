import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { get, isArray } from 'lodash';
import { useEffect, useRef } from 'react';
import { toast } from 'sonner';

export const useLazyNotify = ({
  error,
  isSuccess,
  isLoading = false,
  successMessage = 'Done!',
  errorMessage = '',
  loadingMessage = 'Loading...',
  successFn,
  errorFn,
}: {
  error?: FetchBaseQueryError | SerializedError;
  isSuccess?: boolean;
  isLoading: boolean;
  successMessage?: string;
  errorMessage?: string;
  loadingMessage?: string;
  successFn?: () => void;
  errorFn?: () => void;
}) => {
  const toastId = useRef<string | number>('');

  useEffect(() => {
    if (isLoading) {
      toastId.current = toast.loading(loadingMessage);
    }

    return () => {
      toast.dismiss(toastId.current);
    };
  }, [isLoading, loadingMessage]);

  useEffect(() => {
    if (isSuccess) {
      toast.dismiss(toastId.current);
      toast.success(successMessage);
      successFn?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, successMessage]);

  useEffect(() => {
    if (error) {
      toast.dismiss(toastId.current);
      const message =
        errorMessage ||
        (isArray(get(error, 'data.message'))
          ? get(error, 'data.message')?.[0]
          : get(error, 'data.message'));

      toast.error(message ?? 'Something went wrong.');
      errorFn?.();
    }
  }, [error, errorMessage]);

  return { toastId: toastId.current };
};
