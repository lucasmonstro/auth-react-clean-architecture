import { faker } from '@faker-js/faker';
import JWT from '../entities/JWT';
import { Input, LoginUseCase, setupLoginUseCase } from './login';
import { GetUserJWTRepository } from './repositories/getUserJWTRepository';

type SutTypes = {
  sut: LoginUseCase;
  getUserJWTRepository: jest.MockedFunction<GetUserJWTRepository>;
};

const makeSut = (): SutTypes => {
  const getUserJWTRepository = jest.fn();
  const sut = setupLoginUseCase(getUserJWTRepository);
  return { sut, getUserJWTRepository };
};

const makeInputMock = (input?: Partial<Input>): Input => ({
  email: faker.internet.email(),
  password: faker.internet.password(),
  ...input,
});

const makeJWTMock = (input?: Partial<JWT>): JWT => ({
  accessToken: faker.internet.password(),
  expiresIn: faker.date.future().getTime(),
  ...input,
});

describe('login', () => {
  it('should return a JWT', async () => {
    const { sut, getUserJWTRepository } = makeSut();
    const input = makeInputMock();
    const jwt = makeJWTMock();
    getUserJWTRepository.mockResolvedValueOnce(jwt);
    const output = await sut(input);
    expect(output).toStrictEqual(jwt);
  });
});
