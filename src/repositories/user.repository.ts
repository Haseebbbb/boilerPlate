export class UserRepository {
  private users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' }
  ];

  findAll() {
    return this.users;
  }
}