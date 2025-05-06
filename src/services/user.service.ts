import { UserRepository } from '../repositories/user.repository';

export class UserService {
  private repo = new UserRepository();

  getAllUsers() {
    return this.repo.findAll();
  }
}