import {TokenData} from "@components/token/token.interface";
// import moment from 'moment'
import jwt from 'jsonwebtoken';
import {envConfig} from "@/config/env";
import {tokenTypes} from "@/config/tokens";
import {RoleEnum} from "@/config/roles";

class TokenService {
    public generateToken(tokenData: TokenData): string {
        return jwt.sign({userId: tokenData.userId, type: tokenData.type, role: tokenData.role}, envConfig.jwt.secret, {
            expiresIn: tokenData.type === 'access' ? envConfig.jwt.accessExpirationMinutes * 60: envConfig.jwt.refreshExpirationDays * 24 * 60 * 60,
            algorithm: 'HS256'
        });
    }

    public async generateAuthTokens (userId: string, role: RoleEnum = RoleEnum.USER) {
        const currentDate = new Date();

        const accessExpirationSeconds = envConfig.jwt.accessExpirationMinutes * 60;
        const accessExpirationDate = currentDate.setSeconds(currentDate.getSeconds() + accessExpirationSeconds);
        const accessToken = this.generateToken({userId, role, type: tokenTypes.ACCESS, expiresIn: accessExpirationSeconds});

        const refreshExpirationSeconds = envConfig.jwt.refreshExpirationDays * 24 * 60 * 60;
        const refreshExpirationDate = currentDate.setSeconds(currentDate.getSeconds() + refreshExpirationSeconds);
        const refreshToken = this.generateToken({userId, role, type: tokenTypes.ACCESS, expiresIn: refreshExpirationSeconds});

        // TODO: Save refresh token to db
        // await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);

        return {
            access: {
                token: accessToken,
                expires: accessExpirationDate,
            },
            refresh: {
                token: refreshToken,
                expires: refreshExpirationDate,
            },
        };
    };
}

export default TokenService;
