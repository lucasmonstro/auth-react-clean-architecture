import JWT from '../entities/JWT';
import { Repository as GetUserAsJWTRepository } from './repositories/getUserAsJWTRepository';

export type Setup = (getUserAsJwtRepository: GetUserAsJWTRepository) => UseCase;
export type Input = { email: string; password: string };
export type Output = JWT;
export type UseCase = (input: Input) => Promise<Output>;

export const setupLoginUseCase: Setup =
  (getUserAsJWTRepository: GetUserAsJWTRepository): UseCase =>
  async (input: Input): Promise<Output> =>
    getUserAsJWTRepository(input);
