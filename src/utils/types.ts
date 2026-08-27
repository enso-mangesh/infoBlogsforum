export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface GenericApiResponse<T> {
  statusCode: number;
  success: boolean;
  message?: string;
  data: T;
  meta?: PaginationMeta;
}