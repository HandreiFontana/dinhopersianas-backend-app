import { IUserTokenDTO } from '@modules/authentication/dtos/i-user-token-dto'
import { UserToken } from '@modules/authentication/infra/typeorm/entities/user-token'
import { IUserTokenRepository } from '../i-user-token-repository'

class UserTokenRepositoryInMemory implements IUserTokenRepository {
  usersToken: UserToken[] = [];

  async create({
    expiresDate,
    refreshToken,
    userId,
  }: IUserTokenDTO): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      expiresDate,
      refreshToken,
      userId,
    });

    this.usersToken.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string
  ): Promise<UserToken> {
    const userToken = this.usersToken.find(
      (ut) => ut.userId === userId && ut.refreshToken && refreshToken
    );
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    const userToken = this.usersToken.find((ut) => ut.id === id);
    this.usersToken.splice(this.usersToken.indexOf(userToken));
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    const userToken = this.usersToken.find(
      (ut) => ut.refreshToken === refreshToken
    );
    return userToken;
  }
}

export { UserTokenRepositoryInMemory };
