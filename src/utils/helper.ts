import { AxiosResponse } from 'axios';
import { GenericApiResponse } from './types';

export function unwrapApiResponse<T>(
  response: AxiosResponse<GenericApiResponse<T>>,
) {
  const payload = response.data;

  if (!payload.success) {
    throw new Error(
      payload.message || 'Something went wrong',
    );
  }

  return {
    data: payload.data,
    meta: payload.meta,
  };
}