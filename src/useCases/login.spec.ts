import { faker } from '@faker-js/faker';
import JWT from '../entities/JWT';
import { Input, setupLoginUseCase, UseCase } from './login';
import { Repository as GetUserAsJWTRepository } from './repositories/getUserAsJWTRepository';

type SutTypes = {
  sut: UseCase;
  getUserAsJWTRepository: jest.MockedFunction<GetUserAsJWTRepository>;
};

const makeSut = (): SutTypes => {
  const getUserAsJWTRepository = jest.fn();
  const sut = setupLoginUseCase(getUserAsJWTRepository);
  return { sut, getUserAsJWTRepository };
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
    const { sut, getUserAsJWTRepository } = makeSut();
    const input = makeInputMock();
    const jwt = makeJWTMock();
    getUserAsJWTRepository.mockReturnValueOnce(Promise.resolve(jwt));
    const output = await sut(input);
    expect(output).toStrictEqual(jwt);
  });
});
