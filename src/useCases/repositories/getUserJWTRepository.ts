import JWT from '../../entities/JWT';

export type Input = { email: string; password: string };
export type Output = JWT;
export type GetUserJWTRepository = (input: Input) => Promise<Output>;
