import { UserService } from '../src/services/user.service';
import { UserRepository } from '../src/repositories/user.repository';

jest.mock('../src/repositories/user.repository');

describe('UserService', () => {
  let userService: UserService;
  let mockRepo: jest.Mocked<UserRepository>;
  const mockUsers = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockRepo = {
      findAll: jest.fn().mockReturnValue(mockUsers)
    } as any;
    (UserRepository as jest.Mock).mockImplementation(() => mockRepo);
    userService = new UserService();
  });

  describe('getAllUsers', () => {
    it('should return all users from repository', () => {
      const result = userService.getAllUsers();
      
      expect(result).toEqual(mockUsers);
      expect(mockRepo.findAll).toHaveBeenCalled();
    });

    it('should throw Error, when Error is thrown By repository', () => {
      jest.clearAllMocks();
      mockRepo = {
        findAll: jest.fn().mockImplementation(() => {throw new Error('error')})
      } as any;
      (UserRepository as jest.Mock).mockImplementation(() => mockRepo);
      userService = new UserService();

      // const result = userService.getAllUsers();
      
      expect(()=>userService.getAllUsers()).toThrow('error');
      expect(mockRepo.findAll).toHaveBeenCalled();

    });
  });

  
});