import { FastifyRequest } from 'fastify';

import { CreateUser, GetUser } from '@components/user/user.interface';

import UserService from '@components/user/user.service';

/**
 * Controller handling user related endpoints.
 */
class UserController {
  /**
   * User service instance.
   * @type {UserService}
   */
  public userService = new UserService();

  /**
   * Creates a new user.
   * @param {FastifyRequest<{ Body: CreateUser }>} req - Fastify request object containing user creation data.
   * @returns {Promise<{ data: User, message: string }>} An object containing user data and a message indicating success.
   */
  public createUser = async (req: FastifyRequest<{ Body: CreateUser }>) => {
    const { email, password, role } = req.body;

    const data = await this.userService.createUser({ email, password, role });

    return { data, message: 'user created' };
  };


  /**
   * Retrieves user information based on the authenticated user's email.
   * @param {FastifyRequest} req - Fastify request object containing authenticated user information.
   * @returns {Promise<{ data: User, message: string }>} An object containing user data and a message indicating success.
   */
  public getUser = async (req: FastifyRequest) => {
    const { email } = req.user as GetUser;

    const data = await this.userService.getUser({ email });

    return { data, message: 'get user' };
  };
}

export default UserController;
