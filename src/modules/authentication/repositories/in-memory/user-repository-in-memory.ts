import { User } from '@modules/authentication/infra/typeorm/entities/user'
import { IUserDTO } from '../../dtos/i-user-dto'
import { IUserRepository } from '../i-user-repository'

class UserRepositoryInMemory implements IUserRepository {
  user: User[] = []

  async create({
    email,
    name,
    password
  }: IUserDTO): Promise<void> {
    const user = new User()

    Object.assign(user, {
      email,
      name,
      password
    })

    this.user.push(user)
  }

  async findByEmail(email: string): Promise<User> {
    return this.user.find((user) => user.email === email)
  }

  async findById(id: string): Promise<User> {
    return this.user.find((user) => user.id === id)
  }
}

export { UserRepositoryInMemory }
