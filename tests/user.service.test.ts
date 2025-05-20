import { UserService } from '../src/services/user.service';
import { UserRepository } from '../src/repositories/user.repository';

// Mock the database module
jest.mock('../src/config/database', () => ({
  db: {
    select: jest.fn(),
    where: jest.fn(),
    first: jest.fn(),
    insert: jest.fn(),
    returning: jest.fn()
  }
}));

describe('UserService', () => {
  let userService: UserService;
  const mockUsers = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' }
  ];

  beforeEach(() => {
    userService = new UserService();
    jest.clearAllMocks();
  });

  describe('getAllUsers', () => {
    it('should return all users', async () => {
      jest.spyOn(UserRepository.prototype, 'findAll').mockResolvedValue(mockUsers);
      
      const result = await userService.getAllUsers();
      
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const mockUser = mockUsers[0];
      jest.spyOn(UserRepository.prototype, 'findById').mockResolvedValue(mockUser);
      
      const result = await userService.getUserById(1);
      
      expect(result).toEqual(mockUser);
    });

    it('should return undefined for non-existent user', async () => {
      jest.spyOn(UserRepository.prototype, 'findById').mockResolvedValue(undefined);
      
      const result = await userService.getUserById(999);
      
      expect(result).toBeUndefined();
    });
  });

  describe('createUser', () => {
    it('should create and return a new user', async () => {
      const newUser = { name: 'New User' };
      const createdUser = { id: 3, ...newUser };
      jest.spyOn(UserRepository.prototype, 'create').mockResolvedValue(createdUser);
      
      const result = await userService.createUser(newUser);
      
      expect(result).toEqual(createdUser);
    });
  });
});