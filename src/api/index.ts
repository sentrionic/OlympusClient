import Axios, { AxiosResponse } from 'axios';

import {
  ArticleResponse,
  AuthResponse,
  ChangePasswordInput,
  CommentDTO,
  CommentResponse,
  LoginDTO,
  PaginatedArticles,
  ProfileResponse,
  RegisterDTO,
  ResetPasswordInput,
  UserResponse,
} from './models';

const request = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
});

export const setCookie = (cookie?: string) => {
  request.defaults.headers.cookie = cookie || null;
};

// auth
export const login = (body: LoginDTO): Promise<AxiosResponse<AuthResponse>> =>
  request.post('/users/login', body);

export const register = (
  body: RegisterDTO
): Promise<AxiosResponse<AuthResponse>> => request.post('/users', body);

export const logout = (): Promise<AxiosResponse<boolean>> =>
  request.post('/users/logout');

export const forgotPassword = (
  email: string
): Promise<AxiosResponse<boolean>> =>
  request.post('/users/forgot-password', { email });

export const changePassword = (
  body: ChangePasswordInput
): Promise<AxiosResponse<UserResponse>> =>
  request.put('/users/change-password', body);

export const resetPassword = (
  body: ResetPasswordInput
): Promise<AxiosResponse<UserResponse>> =>
  request.post('/users/reset-password', body);

// user
export const getCurrentUser = (): Promise<AxiosResponse<ProfileResponse>> =>
  request.get('/user');

export const updateUser = (
  body: FormData
): Promise<AxiosResponse<ProfileResponse>> =>
  request.put('/user', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

// profiles
export const getProfile = (
  username: string
): Promise<AxiosResponse<ProfileResponse>> =>
  request.get(`/profiles/${username}`);

export const followUser = (
  username: string
): Promise<AxiosResponse<ProfileResponse>> =>
  request.post(`/profiles/${username}/follow`);

export const unfollowUser = (
  username: string
): Promise<AxiosResponse<ProfileResponse>> =>
  request.delete(`/profiles/${username}/follow`);

// articles
const paginate = (count: number, cursor?: string) =>
  `limit=${count}${cursor ? `&cursor=${cursor}` : ''}`;

const pagePaginate = (count: number, page?: number) =>
  `limit=${count}${page ? `&p=${page}` : ''}`;

export const getAllArticles = (
  page?: number
): Promise<AxiosResponse<PaginatedArticles>> => {
  return request.get(`/articles?${pagePaginate(10, page)}`);
};

export const getFeed = (
  cursor?: string
): Promise<AxiosResponse<PaginatedArticles>> => {
  return request.get(`/articles/feed?${paginate(10, cursor)}`);
};

export const getArticlesByAuthor = (
  username: string,
  cursor?: string
): Promise<AxiosResponse<PaginatedArticles>> =>
  request.get(`/articles?author=${username}&${paginate(5, cursor)}`);

export const getAuthorFavorites = (
  username: string,
  cursor?: string
): Promise<AxiosResponse<PaginatedArticles>> =>
  request.get(`/articles?favorited=${username}&${paginate(5, cursor)}`);

export const getArticlesByTag = (
  tag: string,
  cursor?: string
): Promise<AxiosResponse<PaginatedArticles>> =>
  request.get(`/articles?tag=${tag}&${paginate(5, cursor)}`);

export const getArticleBySlug = (
  slug: string
): Promise<AxiosResponse<ArticleResponse>> => request.get(`/articles/${slug}`);

export const createArticle = (
  body: FormData
): Promise<AxiosResponse<ArticleResponse>> =>
  request.post('/articles', body, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

export const updateArticle = (
  slug: string,
  body: FormData
): Promise<AxiosResponse<ArticleResponse>> =>
  request.put(`/articles/${slug}`, body);

export const deleteArticle = (
  slug: string
): Promise<AxiosResponse<ArticleResponse>> =>
  request.delete(`/articles/${slug}`);

export const favoriteArticle = (slug: string): Promise<ArticleResponse> =>
  request.post(`/articles/${slug}/favorite`);

export const unfavoriteArticle = (slug: string): Promise<ArticleResponse> =>
  request.delete(`/articles/${slug}/favorite`);

// comments
export const getArticlesComments = (slug: string): Promise<CommentResponse[]> =>
  request.get(`/articles/${slug}/comments`);

export const createComment = (
  slug: string,
  comment: CommentDTO
): Promise<AxiosResponse<CommentResponse>> =>
  request.post(`/articles/${slug}/comments`, comment);

export const deleteComment = (
  slug: string,
  id: number
): Promise<AxiosResponse<CommentResponse>> =>
  request.delete(`/articles/${slug}/comments/${id}`);

// tags
export const getTags = (): Promise<AxiosResponse<string[]>> =>
  request.get('/articles/tags');
