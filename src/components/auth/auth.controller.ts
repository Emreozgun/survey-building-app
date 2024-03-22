import {FastifyReply, FastifyRequest} from 'fastify';
import {LoginUser} from '@components/auth/auth.interface';
import AuthService from '@components/auth/auth.service';
import {CreateUser} from "@components/user/user.interface";

class AuthController {
  public authService = new AuthService();
  public login = async (req: FastifyRequest<{ Body: LoginUser }>, reply: FastifyReply) => {
    const { email, password } = req.body;

    const data = await this.authService.LoginUser({ email, password }, reply);

    return { access: data.authTokens.access, refresh: data.authTokens.refresh, userId: data.userId, message: 'login' };
  };

  public register = async (req: FastifyRequest<{ Body: CreateUser }>) => {
    const { email, password, role } = req.body;

    const data = await this.authService.RegisterUser({ email, password, role });

    return { access: data.authTokens.access, refresh: data.authTokens.refresh, userId: data.userId, message: 'register' };
  };


}

export default AuthController;
