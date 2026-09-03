'use server';

import { httpServer } from '@/core/api/http-server';
import { API_ENDPOINTS } from '@/core/config/api-endpoints';
import { GenericApiResponse} from '@/utils/types';
import { Blog, CreateBlogPayload, UpdateBlogPayload } from '../blog.type';
import { unwrapApiResponse } from '@/utils/helper';

interface BlogLikeData {
  blogId: string;
  liked: boolean;
}
export async function createBlog(
  payload: CreateBlogPayload,
) {
  try {
    console.log("CREATE BLOG PAYLOAD:", payload);

    const response =
      await httpServer.post<GenericApiResponse<Blog>>(
        API_ENDPOINTS.BLOGS.CREATE,
        payload,
      );

    console.log("CREATE BLOG RESPONSE:", response.data);

    return {
      success: true,
      ...unwrapApiResponse(response),
    };
  } catch (error: any) {
    console.error("========== CREATE BLOG ERROR ==========");

    console.error("message:", error?.message);
    console.error("code:", error?.code);
    console.error("baseURL:", error?.config?.baseURL);
    console.error("url:", error?.config?.url);
    console.error("method:", error?.config?.method);
    console.error("response:", error?.response?.data);
    console.error("status:", error?.response?.status);

    console.error("=======================================");

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

export async function getBlogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs?limit=20`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      errorText || `Failed to fetch blogs (${response.status})`,
    );
  }

  return response.json();
}

export async function getMyBlogs() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/my?limit=20`, {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();

    throw new Error(
      errorText || `Failed to fetch my blogs (${response.status})`,
    );
  }

  return response.json();
}

export async function getBlogById(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/blogs/${id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.API_TOKEN}`,
        },
        cache: "no-store",
      },
    );

    const data = await response.json();

    console.log("========== GET BLOG BY ID ==========");
    console.log("ID:", id);
    console.log("STATUS:", response.status);
    console.log("RESPONSE:", data);
    console.log("====================================");

    if (!response.ok || !data.success) {
      return {
        success: false,
        error: data?.message || "Blog not found",
      };
    }

    return {
      success: true,
      data: data.data,
    };
  } catch (error: any) {
    console.error("getBlogById failed:", error);

    return {
      success: false,
      error: error?.message || "Blog not found",
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

export async function likeBlog(blogId: string) {
  try {
    const response = await httpServer.post<
      GenericApiResponse<BlogLikeData>
    >(
      API_ENDPOINTS.BLOGS.LIKE(blogId),
    );

    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error: any) {
    return { };
  }
}

export async function unlikeBlog(blogId: string) {
  try {
    const response = await httpServer.delete<
      GenericApiResponse<BlogLikeData>
    >(
      API_ENDPOINTS.BLOGS.UNLIKE(blogId),
    );

    return {
      success: response.data.success,
      data: response.data.data,
    };
  } catch (error: any) {
    return {
      success: false,
      error:
        error?.response?.data?.message ||
        error?.message ||
        "Failed to unlike blog",
    };
  }
}
// export async function submitBlog(
//   id: string,
// ) {
//   try {
//     const response =
//       await httpServer.post<
//         GenericApiResponse<Blog>
//       >(
//         API_ENDPOINTS.BLOGS.SUBMIT(id),
//       );

//     return {
//       success: true,
//       ...unwrapApiResponse(response),
//     };
//   } catch (error) {
//     console.error(
//       'submitBlog failed:',
//       error,
//     );

//     return {
//       success: false,
//       error: 'Failed to submit blog',
//     };
//   }
// }