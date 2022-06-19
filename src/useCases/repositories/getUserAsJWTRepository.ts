import JWT from '../../entities/JWT';
import { Http, HttpOutput } from '../services/http';

export type Setup = (http: Http) => Repository;
export type Input = { email: string; password: string };
export type Output = HttpOutput<JWT>;
export type Repository = (input: Input) => Promise<Output>;
export const setupGetUserAsJWTRepository: Setup =
  (http: Http): Repository =>
  async (input: Input): Promise<Output> =>
    http.post<Input, Output>({ url: '/login', body: input });
