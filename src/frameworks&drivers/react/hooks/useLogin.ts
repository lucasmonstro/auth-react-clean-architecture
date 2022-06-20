import { useState } from 'react';
import setupRemoteGetUserJWTRepository from '../../../adapters/repositories/getUserJWTRepository';
import JWT from '../../../entities/JWT';
import { Input, setupLoginUseCase } from '../../../useCases/login';
import axiosInstance from '../../axios';

const useLogin = () => {
  const [invalidCredentials, setInvalidCredentials] = useState(false);
  const loginUseCase = async (input: Input): Promise<JWT | null> => {
    try {
      setInvalidCredentials(false);
      const getUserJWTRepository =
        setupRemoteGetUserJWTRepository(axiosInstance);
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
