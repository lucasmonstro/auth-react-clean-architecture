import JWT from '../../entities/JWT';
import { Input, setupLoginUseCase } from '../../useCases/login';
import getUserJWTRepository from '../repositories/getUserJWTRepository';

const useLogin = (useState: any) => {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const loginUseCase = async (input: Input): Promise<JWT | null> => {
    try {
      setInvalidCredentials(false);
      const loginUseCase = setupLoginUseCase(getUserJWTRepository);
      const jwt = await loginUseCase(input);
      return jwt;
    } catch (error) {
      setInvalidCredentials(true);
      return null;
    }
  };
  return { loginUseCase, invalidCredentials };
};

export default useLogin;
