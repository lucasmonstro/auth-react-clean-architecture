import http from '../../../frameworks&drivers/http';
import { Input, setupLoginUseCase } from '../../../useCases/login';
import { setupGetUserAsJWTRepository } from '../../../useCases/repositories/getUserAsJWTRepository';

const useLogin = () => {
  const loginUseCase = async (input: Input) => {
    try {
      const getUserAsJWTRepository = setupGetUserAsJWTRepository(http);
      const loginUseCase = setupLoginUseCase(getUserAsJWTRepository);
      const jwt = await loginUseCase(input);
      return jwt;
    } catch (error) {
      return null;
    }
  };
  return { loginUseCase };
};

export default useLogin;
