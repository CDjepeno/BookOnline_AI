// Method HTTP
export enum MethodHttpEnum {
  GET = 'get',
  PUT = 'put',
  POST = 'post',
  DELETE = 'delete',
  PATCH = 'patch',
}

// Router
export enum Route {
  LOGIN = 'login',
  REGISTER = '/register',
  ADD_BOOK = '/add-book',
  HOME = '/',
}

// Routes http
export const BOOKS_ROUTE = '/getbooks';
export const BOOK_ROUTE = '/books';
export const LOGIN_ROUTE = '/auth/login';
export const CURRENT_USER_ROUTE = '/auth/current';

export const BASE_URL = 'http://localhost:3000/'