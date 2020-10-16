import Axios, { AxiosResponse } from 'axios';

import {
  LoginDTO,
  ResponseData,
  AuthResponse,
  RegisterDTO,
  ProfileResponse,
  CommentDTO,
  CommentResponse,
  ArticleResponse,
  ArticleDTO,
  PaginatedArticles,
} from './models';

const request = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
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

export const getAllArticles = (
  cursor?: string
): Promise<AxiosResponse<PaginatedArticles>> => {
  return request.get(`/articles?${paginate(10, cursor)}`);
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

export const createArticle = (body: ArticleDTO): Promise<AxiosResponse<ArticleResponse>> =>
  request.post('/articles', body);

export const updateArticle = (
  slug: string,
  body: ArticleDTO
): Promise<ArticleResponse> => request.put(`/articles/${slug}`, body);

export const deleteArticle = (slug: string): Promise<ArticleResponse> =>
  request.put(`/articles/${slug}`);

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
): Promise<CommentResponse> =>
  request.post(`/articles/${slug}/comments`, comment);

export const deleteComment = (
  slug: string,
  id: string
): Promise<CommentResponse> =>
  request.delete(`/articles/${slug}/comments/${id}`);

// tags
export const getTags = (): Promise<string[]> => request.get('/tags');
