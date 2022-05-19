import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { UserRepository } from '@modules/authentication/infra/typeorm/repositories/user-repository'
import { AppError } from '@shared/errors/app-error'
import { UserTokenRepository } from '@modules/authentication/infra/typeorm/repositories/user-token-repository'
import auth from '@config/auth'

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction ) {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(' ')

  try {
    const { sub: userId } = verify(token, auth.secret_token) as IPayload

    request.user = {
      id: userId,
    }

    next()
  } catch {
    throw new AppError('Invalid token!', 401)
  }
}
