import { AxiosResponse } from 'axios';

interface BaseEntity {
  id: number;
  createdAt: string;
  updatedAt: string;
}

type Body<K extends string, T> = {
  [S in K]: T;
};

export type ResponseData<K extends string, T> = AxiosResponse<
  Body<K, T & BaseEntity>
>;

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

export interface CommentResponse {
  body: string;
  author: ProfileResponse;
}
