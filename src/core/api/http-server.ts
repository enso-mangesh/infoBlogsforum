import { serverApi } from './axios-server';

const API_VERSION = '/api/v1';

export const httpServer = {
  get: <T = unknown>(
    url: string,
    config?: object,
  ) => {
    return serverApi.get<T>(
      `${API_VERSION}${url}`,
      config,
    );
  },

  post: <T = unknown>(
    url: string,
    data?: unknown,
    config?: object,
  ) => {
    return serverApi.post<T>(
      `${API_VERSION}${url}`,
      data,
      config,
    );
  },

  put: <T = unknown>(
    url: string,
    data?: unknown,
    config?: object,
  ) => {
    return serverApi.put<T>(
      `${API_VERSION}${url}`,
      data,
      config,
    );
  },

  patch: <T = unknown>(
    url: string,
    data?: unknown,
    config?: object,
  ) => {
    return serverApi.patch<T>(
      `${API_VERSION}${url}`,
      data,
      config,
    );
  },

  delete: <T = unknown>(
    url: string,
    config?: object,
  ) => {
    return serverApi.delete<T>(
      `${API_VERSION}${url}`,
      config,
    );
  },
};