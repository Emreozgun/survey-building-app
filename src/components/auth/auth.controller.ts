import {FastifyReply, FastifyRequest} from 'fastify';
import {LoginUser} from '@components/auth/auth.interface';
import AuthService from '@components/auth/auth.service';
import {CreateUser} from "@components/user/user.interface";



/**
 * Controller handling authentication related endpoints.
 */
class AuthController {
  public authService = new AuthService();

  /**
   * @description Handles user login operation.
   * @param {FastifyRequest<{ Body: LoginUser }>} req - Fastify request object containing login user credentials.
   * @param {FastifyReply} reply - Fastify reply object.
   * @returns {Object} An object containing access token, refresh token, user ID, and a message indicating login success.
   */
  public login = async (req: FastifyRequest<{ Body: LoginUser }>, reply: FastifyReply) => {
    const { email, password } = req.body;

    const data = await this.authService.LoginUser({ email, password }, reply);

    return { access: data.authTokens.access, refresh: data.authTokens.refresh, userId: data.userId, message: 'login' };
  };

  /**
   * @description Handles user registration operation.
   * @param {FastifyRequest<{ Body: CreateUser }>} req - Fastify request object containing user registration details.
   * @returns {Object} An object containing access token, refresh token, user ID, and a message indicating registration success.
   */
  public register = async (req: FastifyRequest<{ Body: CreateUser }>) => {
    console.log('register');

    const data = await this.authService.RegisterUser(req.body);

    return { access: data.authTokens.access, refresh: data.authTokens.refresh, userId: data.userId, message: 'register' };
  };

}

export default AuthController;
