import Axios from 'axios';
import {
  LoginDTO,
  ResponseData,
  AuthResponse,
  UserDTO,
  RegisterDTO,
  ProfileResponse,
  CommentDTO,
  CommentResponse,
  ArticleResponse,
  ArticleDTO,
} from './models';

const request = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND,
  withCredentials: true,
});

export const setCookie = (cookie?: string) => {
  request.defaults.headers.cookie = cookie || null;
};

// auth
export const login = (
  body: LoginDTO
): Promise<ResponseData<'user', AuthResponse>> =>
  request.post('/users/login', body);

export const register = (
  body: RegisterDTO
): Promise<ResponseData<'user', AuthResponse>> => request.post('/users', body);

// user
export const getCurrentUser = (): Promise<ProfileResponse> =>
  request.get('/user');

export const updateUser = (
  body: UserDTO
): Promise<ResponseData<'user', ProfileResponse>> => request.put('/user', body);

// profiles
export const getUser = (
  username: string
): Promise<ResponseData<'user', ProfileResponse>> =>
  request.get(`/profiles/${username}`);

export const followUser = (
  username: string
): Promise<ResponseData<'user', ProfileResponse>> =>
  request.post(`/profiles/${username}/follow`);

export const unfollowUser = (
  username: string
): Promise<ResponseData<'user', ProfileResponse>> =>
  request.delete(`/profiles/${username}/follow`);

// articles
const paginate = (count: number, page?: number) =>
  `limit=${count}&offset=${page ? page * count : 0}`;

export const getAllArticles = (
  page?: number
): Promise<
  ResponseData<'articles', ArticleResponse[]> &
    ResponseData<'articlesCount', number>
> => {
  return request.get(`/articles?${paginate(10, page)}`);
};

export const getFeed = (
  page?: number
): Promise<
  ResponseData<'articles', ArticleResponse[]> &
    ResponseData<'articlesCount', number>
> => {
  return request.get(`/articles/feed?${paginate(10, page)}`);
};

export const getArticlesByAuthor = (
  username: string,
  page?: number
): Promise<
  ResponseData<'articles', ArticleResponse[]> &
    ResponseData<'articlesCount', number>
> => request.get(`/articles?author=${username}&${paginate(5, page)}`);

export const getArticlesByTag = (
  tag: string,
  page?: number
): Promise<
  ResponseData<'articles', ArticleResponse[]> &
    ResponseData<'articlesCount', number>
> => request.get(`/articles?tag=${tag}&${paginate(5, page)}`);

export const getArticleBySlug = (
  slug: string
): Promise<ResponseData<'article', ArticleResponse>> =>
  request.get(`/articles/${slug}`);

export const createArticle = (
  body: ArticleDTO
): Promise<ResponseData<'article', ArticleResponse>> =>
  request.post('/articles', body);

export const updateArticle = (
  slug: string,
  body: ArticleDTO
): Promise<ResponseData<'article', ArticleResponse>> =>
  request.put(`/articles/${slug}`, body);

export const deleteArticle = (
  slug: string
): Promise<ResponseData<'article', ArticleResponse>> =>
  request.put(`/articles/${slug}`);

export const favoriteArticle = (
  slug: string
): Promise<ResponseData<'article', ArticleResponse>> =>
  request.post(`/articles/${slug}/favorite`);

export const unfavoriteArticle = (
  slug: string
): Promise<ResponseData<'article', ArticleResponse>> =>
  request.delete(`/articles/${slug}/favorite`);

// comments
export const getArticlesComments = (
  slug: string
): Promise<ResponseData<'comment', CommentResponse[]>> =>
  request.get(`/articles/${slug}/comments`);

export const createComment = (
  slug: string,
  comment: CommentDTO
): Promise<ResponseData<'comment', CommentResponse>> =>
  request.post(`/articles/${slug}/comments`, comment);

export const deleteComment = (
  slug: string,
  id: string
): Promise<ResponseData<'comment', CommentResponse>> =>
  request.delete(`/articles/${slug}/comments/${id}`);

// tags
export const getTags = (): Promise<ResponseData<'tags', string[]>> =>
  request.get('/tags');
