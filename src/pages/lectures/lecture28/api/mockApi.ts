/**
 * Mock API for TanStack Query Examples
 *
 * 실제 API 없이 로컬에서 데이터를 시뮬레이션합니다.
 */

// Todo 타입
export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  createdAt: string;
}

// User 타입
export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
}

// Post 타입
export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  likes: number;
  createdAt: string;
}

// Mock 데이터 저장소
let todos: Todo[] = [
  {
    id: 1,
    title: 'TanStack Query 학습하기',
    completed: false,
    createdAt: new Date().toISOString(),
  },
  { id: 2, title: 'useQuery 마스터하기', completed: false, createdAt: new Date().toISOString() },
  { id: 3, title: 'useMutation 연습하기', completed: true, createdAt: new Date().toISOString() },
  { id: 4, title: '페이지네이션 구현하기', completed: false, createdAt: new Date().toISOString() },
  {
    id: 5,
    title: '낙관적 업데이트 적용하기',
    completed: false,
    createdAt: new Date().toISOString(),
  },
];

const users: User[] = [
  { id: 1, name: '김철수', email: 'kim@example.com', avatar: '👨' },
  { id: 2, name: '이영희', email: 'lee@example.com', avatar: '👩' },
  { id: 3, name: '박민수', email: 'park@example.com', avatar: '👨‍💼' },
  { id: 4, name: '최지은', email: 'choi@example.com', avatar: '👩‍💼' },
];

let posts: Post[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  title: `게시글 제목 ${i + 1}`,
  content: `게시글 내용 ${i + 1}입니다. TanStack Query를 사용하면 데이터 관리가 정말 쉬워집니다!`,
  authorId: (i % 4) + 1,
  likes: Math.floor(Math.random() * 100),
  createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
}));

// 지연 시뮬레이션 (네트워크 지연 효과)
const delay = (ms: number = 800) => new Promise((resolve) => setTimeout(resolve, ms));

// 랜덤 에러 시뮬레이션 (10% 확률)
const randomError = () => {
  if (Math.random() < 0.1) {
    throw new Error('네트워크 오류가 발생했습니다');
  }
};

// ==================== Todos API ====================

export const fetchTodos = async (): Promise<Todo[]> => {
  await delay();
  randomError();
  // console.log('fetchTodos');
  return [...todos];
};

export const fetchTodo = async (id: number): Promise<Todo> => {
  await delay();
  const todo = todos.find((t) => t.id === id);
  if (!todo) throw new Error('Todo not found');
  return todo;
};

export const createTodo = async (data: { title: string }): Promise<Todo> => {
  await delay();
  const newTodo: Todo = {
    id: Math.max(...todos.map((t) => t.id), 0) + 1,
    title: data.title,
    completed: false,
    createdAt: new Date().toISOString(),
  };
  todos = [...todos, newTodo];
  return newTodo;
};

export const updateTodo = async (data: {
  id: number;
  completed?: boolean;
  title?: string;
}): Promise<Todo> => {
  await delay();
  const index = todos.findIndex((t) => t.id === data.id);
  if (index === -1) throw new Error('Todo not found');

  const updatedTodo = { ...todos[index], ...data };
  todos = todos.map((todo, i) => (i === index ? updatedTodo : todo));
  return updatedTodo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await delay();
  todos = todos.filter((t) => t.id !== id);
};

// ==================== Users API ====================

export const fetchUsers = async (): Promise<User[]> => {
  await delay();
  return [...users];
};

export const fetchUser = async (id: number): Promise<User> => {
  await delay();
  const user = users.find((u) => u.id === id);
  if (!user) throw new Error('User not found');
  return user;
};

// ==================== Posts API (Pagination) ====================

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export const fetchPosts = async (
  page: number = 1,
  pageSize: number = 10,
): Promise<PaginatedResponse<Post>> => {
  await delay();

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginatedPosts = posts.slice(start, end);

  return {
    data: paginatedPosts,
    total: posts.length,
    page,
    pageSize,
    totalPages: Math.ceil(posts.length / pageSize),
  };
};

export const fetchPost = async (id: number): Promise<Post> => {
  await delay();
  const post = posts.find((p) => p.id === id);
  if (!post) throw new Error('Post not found');
  return post;
};

export const likePost = async (id: number): Promise<Post> => {
  await delay(300);
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) throw new Error('Post not found');

  const updatedPost = { ...posts[index], likes: posts[index].likes + 1 };
  posts = posts.map((post, i) => (i === index ? updatedPost : post));
  return updatedPost;
};

export const createPost = async (data: {
  title: string;
  content: string;
  authorId: number;
}): Promise<Post> => {
  await delay();
  const newPost: Post = {
    id: Math.max(...posts.map((p) => p.id), 0) + 1,
    ...data,
    likes: 0,
    createdAt: new Date().toISOString(),
  };
  posts = [newPost, ...posts];
  return newPost;
};

export const deletePost = async (id: number): Promise<void> => {
  await delay();
  posts = posts.filter((p) => p.id !== id);
};
