import { Request, Response } from 'express';
import { UserService } from '../services/user.service';

const userService = new UserService();

export const getUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error in getUsers:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);
    
    if (!user) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    
    res.status(200).json(user);
  } catch (error) {
    console.error('Error in getUserById:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      res.status(400).json({ error: 'Name is required' });
      return;
    }
    
    const user = await userService.createUser({ name });
    res.status(201).json(user);
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

  export const deleteUser = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const user = await userService.deleteUser(id)
      res.status(200).json(user);
    } catch (error) {
      console.error('Error in Delete User:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
