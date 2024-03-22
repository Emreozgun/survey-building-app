import {compare} from 'bcrypt';

import {LoginUser} from '@components/auth/auth.interface';

import prisma from '@utils/prisma';

import {NotFound, Unauthorized} from '@exceptions/error';
import {FastifyReply} from 'fastify';
import TokenService from "@components/token/token.service";
import UserService from "@components/user/user.service";
import {CreateUser} from "@components/user/user.interface";

/**
 * Service class for handling authentication related operations.
 */
class AuthService {
  /**
   * Prisma database instance.
   * @type {PrismaClient}
   */
  public db = prisma;

  /**
   * Token service instance.
   * @type {TokenService}
   */
  public tokenService = new TokenService()

  /**
   * User service instance.
   * @type {UserService}
   */
  public userService = new UserService()

  /**
   * Authenticates a user based on login credentials.
   * @param {LoginUser} loginData - The login credentials of the user.
   * @param {FastifyReply} reply - Fastify reply object.
   * @returns {Promise<{ authTokens: AuthTokens, userId: number }>} An object containing authentication tokens and user ID upon successful login.
   * @throws {NotFound} Thrown if the user with the provided email is not found.
   * @throws {Unauthorized} Thrown if the provided password is incorrect.
   */
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

    const  authTokens = await this.tokenService.generateAuthTokens(user?.id);

    return { authTokens, userId: user.id };
  }

  /**
   * Registers a new user.
   * @param {CreateUser} createData - Data for creating the new user.
   * @returns {Promise<{ authTokens: AuthTokens, userId: number }>} An object containing authentication tokens and user ID upon successful registration.
   */
  public async RegisterUser(createData: CreateUser) {
    console.log({createData});
    // TODO: Could be transaction
    const data = await this.userService.createUser(createData);
    console.log({data});
    const  authTokens = await this.tokenService.generateAuthTokens(data?.id);
    console.log({authTokens});
    return { authTokens, userId: data?.id };
  }

}

export default AuthService;
