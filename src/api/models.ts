interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO extends LoginDTO {
  username: string;
}

export type UserDTO = Partial<{
  email: string;
  image: any;
  bio: string;
}>;

export interface UserResponse {
  id: number;
  email: string;
  username?: string;
  bio: string;
  image: string | null;
}

export interface AuthResponse extends UserResponse {
  token: string;
}

export interface ProfileResponse extends UserResponse {
  following: boolean;
  followers: number;
  followee: number;
}

export class ChangePasswordInput {
  currentPassword!: string;
  newPassword!: string;
  confirmNewPassword!: string;
}

export class ResetPasswordInput {
  token!: string;
  newPassword!: string;
  confirmNewPassword!: string;
}

export type ArticleDTO = Partial<{
  title: string;
  body: string;
  description: string;
  image?: any;
  tagList: string[];
}>;

export type ArticleFeedQuery = Partial<{
  limit: number;
  offset: number;
}>;

export type ArticleAllQuery = Partial<{
  tag: string;
  author: string;
  favorited: string;
}> &
  ArticleFeedQuery;

export interface PaginatedArticles {
  articles: ArticleResponse[];
  hasMore: boolean;
}

export interface ArticleResponse {
  id: number;
  slug: string;
  title: string;
  description: string;
  body: string;
  image: string;
  createdAt: string;
  tagList: string[];
  favorited: boolean | null;
  favoritesCount: number;
  author: ProfileResponse;
}

export interface CommentDTO {
  body: string;
}

export interface CommentResponse extends BaseEntity {
  body: string;
  author: ProfileResponse;
}

export interface FieldError {
  field: string;
  message: string;
}