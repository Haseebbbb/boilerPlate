import request from 'supertest';
import app from '../src/app';
import { Request, Response } from 'express';
import { getUsers } from '../src/controllers/user.controller';
import { UserService } from '../src/services/user.service';

// Integration test
describe('GET /users endpoint', () => {
  it('should return list of users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

// Unit tests
jest.mock('../src/services/user.service', () => {
  return {
    UserService: jest.fn().mockImplementation(() => ({
      getAllUsers: jest.fn()
    }))
  };
});

describe('UserController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockUsers: { id: number; name: string; }[];

  beforeEach(() => {
    mockUsers = [
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' }
    ];

    mockRequest = {};
    mockResponse = {
      json: jest.fn().mockReturnThis(),
      status: jest.fn().mockReturnThis()
    };

    jest.clearAllMocks();
    (UserService as jest.Mock).mockImplementation(() => ({
      getAllUsers: jest.fn().mockReturnValue(mockUsers)
    }));
  });

  describe('getUsers', () => {
    it('should return all users with status 200', async () => {
      await getUsers(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(mockUsers);
    });

    it('should return 500 on error', async () => {
      const error = new Error('Test error');
      (UserService as jest.Mock).mockImplementation(() => ({
        getAllUsers: jest.fn().mockImplementation(() => {
          throw error;
        })
      }));

      await getUsers(mockRequest as Request, mockResponse as Response);
      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Internal server error' });
    });
  });
});