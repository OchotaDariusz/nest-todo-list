import { Repository } from 'typeorm';

export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]?: jest.Mock<{}>;
};

const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  find: jest.fn((entity) => [...entity]),
  findOneBy: jest.fn((entity) => entity),
  // ...
}));

export default repositoryMockFactory;
