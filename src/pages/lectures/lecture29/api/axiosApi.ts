/**
 * Axios API Client for TanStack Query Examples
 *
 * 실제 API (JSONPlaceholder)를 사용하여 TanStack Query와 Axios를 통합합니다.
 */
import axios, { AxiosError, type AxiosInstance } from 'axios';

// ==================== 타입 정의 ====================

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
}

export interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export interface Comment {
  id: number;
  postId: number;
  name: string;
  email: string;
  body: string;
}

// ==================== Axios 인스턴스 생성 ====================

/**
 * JSONPlaceholder API를 사용하는 Axios 인스턴스
 * - baseURL: API의 기본 URL
 * - timeout: 요청 타임아웃 (10초)
 */
const apiClient: AxiosInstance = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==================== 요청 인터셉터 ====================

/**
 * 요청 인터셉터
 * - 모든 요청 전에 실행됩니다
 * - 인증 토큰 추가, 요청 로깅 등에 사용
 */
apiClient.interceptors.request.use(
  (config) => {
    // 요청 시작 시간 기록
    config.headers['X-Request-Start-Time'] = Date.now().toString();

    // 콘솔에 요청 정보 출력 (개발 환경에서만)
    console.log('🚀 [Axios Request]', {
      method: config.method?.toUpperCase(),
      url: config.url,
      params: config.params,
      data: config.data,
    });

    // 여기서 인증 토큰을 추가할 수 있습니다
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    console.error('❌ [Axios Request Error]', error);
    return Promise.reject(error);
  },
);

// ==================== 응답 인터셉터 ====================

/**
 * 응답 인터셉터
 * - 모든 응답 후에 실행됩니다
 * - 응답 데이터 가공, 에러 처리 등에 사용
 */
apiClient.interceptors.response.use(
  (response) => {
    // 요청 소요 시간 계산
    const startTime = response.config.headers['X-Request-Start-Time'];
    const duration = startTime ? Date.now() - Number(startTime) : 0;

    // 콘솔에 응답 정보 출력
    console.log('✅ [Axios Response]', {
      method: response.config.method?.toUpperCase(),
      url: response.config.url,
      status: response.status,
      duration: `${duration}ms`,
      data: response.data,
    });

    return response;
  },
  (error: AxiosError) => {
    // 에러 응답 처리
    console.error('❌ [Axios Response Error]', {
      method: error.config?.method?.toUpperCase(),
      url: error.config?.url,
      status: error.response?.status,
      message: error.message,
      data: error.response?.data,
    });

    // 에러 메시지 사용자 친화적으로 변환
    let errorMessage = '알 수 없는 오류가 발생했습니다.';

    if (error.response) {
      // 서버가 응답을 반환한 경우
      switch (error.response.status) {
        case 400:
          errorMessage = '잘못된 요청입니다.';
          break;
        case 401:
          errorMessage = '인증이 필요합니다.';
          break;
        case 403:
          errorMessage = '접근 권한이 없습니다.';
          break;
        case 404:
          errorMessage = '요청한 리소스를 찾을 수 없습니다.';
          break;
        case 500:
          errorMessage = '서버 오류가 발생했습니다.';
          break;
        default:
          errorMessage = `오류가 발생했습니다. (${error.response.status})`;
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못한 경우
      errorMessage = '서버로부터 응답이 없습니다. 네트워크 연결을 확인해주세요.';
    } else {
      // 요청 설정 중 오류가 발생한 경우
      errorMessage = error.message;
    }

    // 에러 객체에 사용자 친화적 메시지 추가
    error.message = errorMessage;

    return Promise.reject(error);
  },
);

// ==================== User API ====================

/**
 * 모든 사용자 목록 가져오기
 */
export const fetchUsers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>('/users');
  return response.data;
};

/**
 * 특정 사용자 정보 가져오기
 */
export const fetchUser = async (id: number): Promise<User> => {
  const response = await apiClient.get<User>(`/users/${id}`);
  return response.data;
};

// ==================== Todo API ====================

/**
 * 모든 Todo 목록 가져오기
 */
export const fetchTodos = async (): Promise<Todo[]> => {
  const response = await apiClient.get<Todo[]>('/todos');
  return response.data;
};

/**
 * 특정 사용자의 Todo 목록 가져오기
 */
export const fetchUserTodos = async (userId: number): Promise<Todo[]> => {
  const response = await apiClient.get<Todo[]>('/todos', {
    params: { userId },
  });
  return response.data;
};

/**
 * 특정 Todo 가져오기
 */
export const fetchTodo = async (id: number): Promise<Todo> => {
  const response = await apiClient.get<Todo>(`/todos/${id}`);
  return response.data;
};

/**
 * 새 Todo 생성하기
 * 참고: JSONPlaceholder는 실제로 데이터를 저장하지 않고 시뮬레이션만 합니다
 */
export const createTodo = async (data: Omit<Todo, 'id'>): Promise<Todo> => {
  const response = await apiClient.post<Todo>('/todos', data);
  return response.data;
};

/**
 * Todo 업데이트하기
 */
export const updateTodo = async (id: number, data: Partial<Todo>): Promise<Todo> => {
  const response = await apiClient.patch<Todo>(`/todos/${id}`, data);
  return response.data;
};

/**
 * Todo 삭제하기
 */
export const deleteTodo = async (id: number): Promise<void> => {
  await apiClient.delete(`/todos/${id}`);
};

// ==================== Post API ====================

/**
 * 모든 게시글 목록 가져오기 (페이지네이션)
 */
export const fetchPosts = async (page: number = 1, limit: number = 10): Promise<Post[]> => {
  const response = await apiClient.get<Post[]>('/posts', {
    params: {
      _page: page,
      _limit: limit,
    },
  });
  return response.data;
};

/**
 * 특정 게시글 가져오기
 */
export const fetchPost = async (id: number): Promise<Post> => {
  const response = await apiClient.get<Post>(`/posts/${id}`);
  return response.data;
};

/**
 * 게시글의 댓글 목록 가져오기
 */
export const fetchPostComments = async (postId: number): Promise<Comment[]> => {
  const response = await apiClient.get<Comment[]>(`/posts/${postId}/comments`);
  return response.data;
};

/**
 * 새 게시글 생성하기
 */
export const createPost = async (data: Omit<Post, 'id'>): Promise<Post> => {
  const response = await apiClient.post<Post>('/posts', data);
  return response.data;
};

/**
 * 게시글 업데이트하기
 */
export const updatePost = async (id: number, data: Partial<Post>): Promise<Post> => {
  const response = await apiClient.put<Post>(`/posts/${id}`, data);
  return response.data;
};

/**
 * 게시글 삭제하기
 */
export const deletePost = async (id: number): Promise<void> => {
  await apiClient.delete(`/posts/${id}`);
};

// ==================== Export ====================

export default apiClient;

// ==================== Fetch API 버전 (비교용) ====================

/**
 * Fetch API를 사용한 구현
 *
 * Axios vs Fetch 비교를 위한 예제입니다.
 *
 * 주요 차이점:
 * 1. Axios는 자동으로 JSON 변환, Fetch는 수동으로 .json() 호출 필요
 * 2. Axios는 에러 상태 코드를 자동으로 reject, Fetch는 수동 확인 필요
 * 3. Axios는 인터셉터 지원, Fetch는 수동 구현 필요
 * 4. Axios는 타임아웃 설정 간단, Fetch는 AbortController 필요
 */

const BASE_URL = 'https://jsonplaceholder.typicode.com';

/**
 * Fetch 에러 처리 헬퍼 함수
 */
const handleFetchResponse = async <T>(response: Response): Promise<T> => {
  // HTTP 에러 상태 체크 (Axios는 자동으로 처리)
  if (!response.ok) {
    let errorMessage = '알 수 없는 오류가 발생했습니다.';

    switch (response.status) {
      case 400:
        errorMessage = '잘못된 요청입니다.';
        break;
      case 401:
        errorMessage = '인증이 필요합니다.';
        break;
      case 403:
        errorMessage = '접근 권한이 없습니다.';
        break;
      case 404:
        errorMessage = '요청한 리소스를 찾을 수 없습니다.';
        break;
      case 500:
        errorMessage = '서버 오류가 발생했습니다.';
        break;
      default:
        errorMessage = `오류가 발생했습니다. (${response.status})`;
    }

    throw new Error(errorMessage);
  }

  // JSON 파싱 (Axios는 자동으로 처리)
  return response.json();
};

// ==================== Fetch User API ====================

/**
 * Fetch로 모든 사용자 목록 가져오기
 */
export const fetchUsersWithFetch = async (): Promise<User[]> => {
  const startTime = Date.now();

  console.log('🚀 [Fetch Request]', {
    method: 'GET',
    url: '/users',
  });

  const response = await fetch(`${BASE_URL}/users`);
  const data = await handleFetchResponse<User[]>(response);

  const duration = Date.now() - startTime;
  console.log('✅ [Fetch Response]', {
    method: 'GET',
    url: '/users',
    status: response.status,
    duration: `${duration}ms`,
    data,
  });

  return data;
};

/**
 * Fetch로 특정 사용자 정보 가져오기
 */
export const fetchUserWithFetch = async (id: number): Promise<User> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  return handleFetchResponse<User>(response);
};

// ==================== Fetch Todo API ====================

/**
 * Fetch로 모든 Todo 목록 가져오기
 */
export const fetchTodosWithFetch = async (): Promise<Todo[]> => {
  const response = await fetch(`${BASE_URL}/todos`);
  return handleFetchResponse<Todo[]>(response);
};

/**
 * Fetch로 특정 사용자의 Todo 목록 가져오기
 */
export const fetchUserTodosWithFetch = async (userId: number): Promise<Todo[]> => {
  // Fetch는 URLSearchParams로 쿼리 파라미터 구성
  const params = new URLSearchParams({ userId: userId.toString() });
  const response = await fetch(`${BASE_URL}/todos?${params}`);
  return handleFetchResponse<Todo[]>(response);
};

/**
 * Fetch로 특정 Todo 가져오기
 */
export const fetchTodoWithFetch = async (id: number): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos/${id}`);
  return handleFetchResponse<Todo>(response);
};

/**
 * Fetch로 새 Todo 생성하기
 */
export const createTodoWithFetch = async (data: Omit<Todo, 'id'>): Promise<Todo> => {
  const startTime = Date.now();

  console.log('🚀 [Fetch Request]', {
    method: 'POST',
    url: '/todos',
    data,
  });

  // Fetch는 수동으로 헤더와 body 설정 필요
  const response = await fetch(`${BASE_URL}/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const result = await handleFetchResponse<Todo>(response);

  const duration = Date.now() - startTime;
  console.log('✅ [Fetch Response]', {
    method: 'POST',
    url: '/todos',
    status: response.status,
    duration: `${duration}ms`,
    data: result,
  });

  return result;
};

/**
 * Fetch로 Todo 업데이트하기
 */
export const updateTodoWithFetch = async (id: number, data: Partial<Todo>): Promise<Todo> => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleFetchResponse<Todo>(response);
};

/**
 * Fetch로 Todo 삭제하기
 */
export const deleteTodoWithFetch = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: 'DELETE',
  });

  // 204 No Content는 응답 본문이 없으므로 JSON 파싱 안 함
  if (!response.ok) {
    throw new Error('Todo 삭제에 실패했습니다.');
  }
};

// ==================== Fetch Post API ====================

/**
 * Fetch로 게시글 목록 가져오기 (페이지네이션)
 */
export const fetchPostsWithFetch = async (
  page: number = 1,
  limit: number = 10,
): Promise<Post[]> => {
  const params = new URLSearchParams({
    _page: page.toString(),
    _limit: limit.toString(),
  });

  const response = await fetch(`${BASE_URL}/posts?${params}`);
  return handleFetchResponse<Post[]>(response);
};

/**
 * Fetch로 특정 게시글 가져오기
 */
export const fetchPostWithFetch = async (id: number): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`);
  return handleFetchResponse<Post>(response);
};

/**
 * Fetch로 게시글의 댓글 목록 가져오기
 */
export const fetchPostCommentsWithFetch = async (postId: number): Promise<Comment[]> => {
  const response = await fetch(`${BASE_URL}/posts/${postId}/comments`);
  return handleFetchResponse<Comment[]>(response);
};

/**
 * Fetch로 새 게시글 생성하기
 */
export const createPostWithFetch = async (data: Omit<Post, 'id'>): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleFetchResponse<Post>(response);
};

/**
 * Fetch로 게시글 업데이트하기
 */
export const updatePostWithFetch = async (id: number, data: Partial<Post>): Promise<Post> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  return handleFetchResponse<Post>(response);
};

/**
 * Fetch로 게시글 삭제하기
 */
export const deletePostWithFetch = async (id: number): Promise<void> => {
  const response = await fetch(`${BASE_URL}/posts/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('게시글 삭제에 실패했습니다.');
  }
};
