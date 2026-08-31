'use server';

import { httpServer } from '@/core/api/http-server';
import { API_ENDPOINTS } from '@/core/config/api-endpoints';

import { GenericApiResponse} from '@/utils/types';

import { Blog, CreateBlogPayload, UpdateBlogPayload } from '../blog.type';
import { unwrapApiResponse } from '@/utils/helper';



export async function getBlogs(
  page = 1,
  limit = 10,
) {
  try {
    const response =
      await httpServer.get<
        GenericApiResponse<Blog[]>
      >(
        API_ENDPOINTS.BLOGS.LIST,
        {
          params: {
            page,
            limit,
          },
        },
      );

    return {
      success: true,
      ...unwrapApiResponse(response),
    };
  } catch (error) {
    console.error(
      'getBlogs failed:',
      error,
    );

    return {
      success: false,
      error: 'Failed to fetch blogs',
    };
  }
}

export async function getBlogBySlug(
  slug: string,
) {
  try {
    const response =
      await httpServer.get<
        GenericApiResponse<Blog>
      >(
        API_ENDPOINTS.BLOGS.DETAIL(slug),
      );

    return {
      success: true,
      ...unwrapApiResponse(response),
    };
  } catch (error) {
    console.error(
      'getBlogBySlug failed:',
      error,
    );

    return {
      success: false,
      error: 'Blog not found',
    };
  }
}
export async function createBlog(
  payload: CreateBlogPayload,
) {
  try {
    console.log("CREATE BLOG PAYLOAD:", payload);

    const response =
      await httpServer.post<
        GenericApiResponse<Blog>
      >(
        API_ENDPOINTS.BLOGS.CREATE,
        payload,
      );

    console.log("CREATE BLOG RESPONSE:", response.data);

    return {
      success: true,
      ...unwrapApiResponse(response),
    };
  } catch (error: any) {
    console.error("createBlog failed:", error);

    console.error(
      "API response:",
      error?.response?.data,
    );

    console.error(
      "API status:",
      error?.response?.status,
    );

    console.error(
      "API URL:",
      error?.config?.baseURL,
      error?.config?.url,
    );

    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.message ||
        "Failed to create blog",
    };
  }
}

export async function updateBlog(
  id: string,
  payload: UpdateBlogPayload,
) {
  try {
    const response =
      await httpServer.patch<
        GenericApiResponse<Blog>
      >(
        API_ENDPOINTS.BLOGS.UPDATE(id),
        payload,
      );

    return {
      success: true,
      ...unwrapApiResponse(response),
    };
  } catch (error) {
    console.error(
      'updateBlog failed:',
      error,
    );

    return {
      success: false,
      error: 'Failed to update blog',
    };
  }
}

export async function deleteBlog(
  id: string,
) {
  try {
    const response =
      await httpServer.delete<
        GenericApiResponse<null>
      >(
        API_ENDPOINTS.BLOGS.DELETE(id),
      );

    return {
      success: true,
      ...unwrapApiResponse(response),
    };
  } catch (error) {
    console.error(
      'deleteBlog failed:',
      error,
    );

    return {
      success: false,
      error: 'Failed to delete blog',
    };
  }
}

export async function submitBlog(
  id: string,
) {
  try {
    const response =
      await httpServer.post<
        GenericApiResponse<Blog>
      >(
        API_ENDPOINTS.BLOGS.SUBMIT(id),
      );

    return {
      success: true,
      ...unwrapApiResponse(response),
    };
  } catch (error) {
    console.error(
      'submitBlog failed:',
      error,
    );

    return {
      success: false,
      error: 'Failed to submit blog',
    };
  }
}