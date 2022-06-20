import JWT from '../entities/JWT';
import { GetUserJWTRepository } from './repositories/getUserJWTRepository';

export type Setup = (
  getUserJwtRepository: GetUserJWTRepository
) => LoginUseCase;
export type Input = { email: string; password: string };
export type Output = JWT | null;
export type LoginUseCase = (input: Input) => Promise<Output>;

export const setupLoginUseCase: Setup =
  (getUserJWTRepository: GetUserJWTRepository): LoginUseCase =>
  async (input: Input): Promise<Output> =>
    getUserJWTRepository(input);
