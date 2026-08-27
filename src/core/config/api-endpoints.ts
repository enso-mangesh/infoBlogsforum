export const API_ENDPOINTS = {
BLOGS: {
  LIST: '/blogs',

  DETAIL: (slug: string) =>
    `/blogs/${slug}`,

  CREATE: '/blogs',

  UPDATE: (id: string) =>
    `/blogs/${id}`,

  DELETE: (id: string) =>
    `/blogs/${id}`,

  SUBMIT: (id: string) =>
    `/blogs/${id}/submit`,

  LIKE: (id: string) =>
    `/blogs/${id}/like`,
},

  FORUM: {
    LIST: '/forum/discussions',

    DETAIL: (id: string) =>
      `/forum/discussions/${id}`,

    CREATE: '/forum/discussions',

    UPDATE: (id: string) =>
      `/forum/discussions/${id}`,

    DELETE: (id: string) =>
      `/forum/discussions/${id}`,

    COMMENTS: (discussionId: string) =>
      `/forum/discussions/${discussionId}/comments`,

    CREATE_COMMENT: (discussionId: string) =>
      `/forum/discussions/${discussionId}/comments`,

    LIKE: (discussionId: string) =>
      `/forum/discussions/${discussionId}/like`,
  },
    COMMENTS: {
    LIST: (parentId: string) =>
      `/comments/${parentId}`,

    CREATE: '/comments',

    UPDATE: (id: string) =>
      `/comments/${id}`,

    DELETE: (id: string) =>
      `/comments/${id}`,

    LIKE: (id: string) =>
      `/comments/${id}/like`,
  },
} as const;