import { User, UserRepository } from '../repositories/user.repository';

export class UserService {
  private repo: UserRepository;

  constructor() {
    this.repo = new UserRepository();
  }

  async getAllUsers(): Promise<User[]> {
    return await this.repo.findAll();
  }

  async getUserById(id: number): Promise<User | undefined> {
    return await this.repo.findById(id);
  }

  async createUser(user: Omit<User, 'id'>): Promise<User> {
    return await this.repo.create(user);
  }
}