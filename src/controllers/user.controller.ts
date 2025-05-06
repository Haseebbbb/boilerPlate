import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const userService = new UserService();
    const users = userService.getAllUsers();
    return res.status(200).json(users || []);
  } catch (error) {
    console.error('Error in getUsers:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};