import {compare} from 'bcrypt';

import {LoginUser} from '@components/auth/auth.interface';

import prisma from '@utils/prisma';

import {NotFound, Unauthorized} from '@exceptions/error';
import {FastifyReply} from 'fastify';
import TokenService from "@components/token/token.service";
import UserService from "@components/user/user.service";
import {CreateUser} from "@components/user/user.interface";

class AuthService {
  public db = prisma;
  public tokenService = new TokenService()
  public userService = new UserService()

  public async LoginUser(loginData: LoginUser, reply: FastifyReply) {
    const user = await this.db.user.findUnique({
      where: {
        email: loginData.email
      }
    });

    if (!user) {
      throw new NotFound('User not found');
    }

    const isPasswordMatching: boolean = await compare(loginData.password, user.password).catch(() => false);

    if (!isPasswordMatching) {
      throw new Unauthorized('Incorrect login credentials');
    }

    const  authTokens = await this.tokenService.generateAuthTokens({ userId: user.id  });

    return { authTokens, userId: user.id };
  }

  public async RegisterUser(createData: CreateUser) {

    // TODO: Could be transaction
    const data = await this.userService.createUser(createData);
    const  authTokens = await this.tokenService.generateAuthTokens({ userId: data.id  });

    return { authTokens, userId: data.id };
  }

}

export default AuthService;
