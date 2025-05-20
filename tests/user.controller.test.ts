import request from 'supertest';
import app from '../src/app';
import { Request, Response } from 'express';
import { getUsers, getUserById, createUser } from '../src/controllers/user.controller';
import { UserService } from '../src/services/user.service';

// Unit tests
jest.mock('../src/services/user.service');

describe('UserController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockJson: jest.Mock;
  let mockStatus: jest.Mock;

  beforeEach(() => {
    mockJson = jest.fn();
    mockStatus = jest.fn().mockReturnValue({ json: mockJson });
    mockRequest = {};
    mockResponse = {
      status: mockStatus,
      json: mockJson,
    };
    jest.clearAllMocks();
  });

  describe('getUsers', () => {
    it('should return all users', async () => {
      const mockUsers = [{ id: 1, name: 'John' }];
      jest.spyOn(UserService.prototype, 'getAllUsers').mockResolvedValue(mockUsers);

      await getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockUsers);
    });

    it('should handle errors', async () => {
      jest.spyOn(UserService.prototype, 'getAllUsers').mockRejectedValue(new Error('DB Error'));

      await getUsers(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(500);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });

  describe('getUserById', () => {
    it('should return user by id', async () => {
      const mockUser = { id: 1, name: 'John' };
      mockRequest.params = { id: '1' };
      jest.spyOn(UserService.prototype, 'getUserById').mockResolvedValue(mockUser);

      await getUserById(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(200);
      expect(mockJson).toHaveBeenCalledWith(mockUser);
    });

    it('should return 404 for non-existent user', async () => {
      mockRequest.params = { id: '999' };
      jest.spyOn(UserService.prototype, 'getUserById').mockResolvedValue(undefined);

      await getUserById(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(404);
      expect(mockJson).toHaveBeenCalledWith({ error: 'User not found' });
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = { name: 'John' };
      const createdUser = { id: 1, ...newUser };
      mockRequest.body = newUser;
      jest.spyOn(UserService.prototype, 'createUser').mockResolvedValue(createdUser);

      await createUser(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(201);
      expect(mockJson).toHaveBeenCalledWith(createdUser);
    });

    it('should return 400 if name is missing', async () => {
      mockRequest.body = {};

      await createUser(mockRequest as Request, mockResponse as Response);

      expect(mockStatus).toHaveBeenCalledWith(400);
      expect(mockJson).toHaveBeenCalledWith({ error: 'Name is required' });
    });
  });
});