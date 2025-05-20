import { db } from '../config/database';

export interface User {
  id: number;
  name: string;
}

export class UserRepository {
  async findAll(): Promise<User[]> {
    return await db('users').select('*');
  }

  async findById(id: number): Promise<User | undefined> {
    return await db('users').where({ id }).first();
  }

  async create(user: Omit<User, 'id'>): Promise<User> {
    const [created] = await db('users').insert(user).returning('*');
    return created;
  }

  
  async delete(id: number): Promise<User[]>{
    return await db('users').delete().where({id}).returning('*');
  }
}