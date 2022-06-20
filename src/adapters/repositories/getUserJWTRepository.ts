import JWT from '../../entities/JWT';
import axiosInstance from '../../frameworks&drivers/axios';
import { Input } from '../../useCases/repositories/getUserJWTRepository';

const remoteGetUserJWTRepository = (input: Input): Promise<JWT> =>
  axiosInstance.post<JWT>('/login', input).then(({ data }) => data);

export default remoteGetUserJWTRepository;
