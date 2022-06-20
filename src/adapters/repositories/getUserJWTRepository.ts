import { StatusCodes } from 'http-status-codes';
import JWT from '../../entities/JWT';
import {
  GetUserJWTRepository,
  Input,
} from '../../useCases/repositories/getUserJWTRepository';

type HttpOutput<T> = Promise<{ data: T; status: number }>;
type Http = {
  post: <Input, Output>(url: string, data: Input) => HttpOutput<Output>;
};

const setupRemoteGetUserJWTRepository =
  (http: Http): GetUserJWTRepository =>
  async (input: Input): Promise<JWT | null> => {
    try {
      const { data } = await http.post<Input, JWT>('/login', input);
      return data as JWT;
    } catch (err) {
      // TODO: fix this any
      const badRequest = (err as any)?.status === StatusCodes.BAD_REQUEST;
      if (badRequest) {
        return null;
      }
      throw new Error('Internal Server Error');
    }
  };

export default setupRemoteGetUserJWTRepository;
