import { AppDataSource } from "../data-source";
import { Users } from "../models/Users";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import authConfig from '../config/auth'
import AppError from "../errors/AppError";

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: Users;
    token: string;
}

class AuthUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = AppDataSource.getRepository(Users);
        const user = await usersRepository.findOne({
            where: { email: email },
        });

        if (!user) {
            throw new AppError("Incorrect email/password combination", 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError("Incorrect email/password combination", 401);
        }

        const { secret, expiresIn } = authConfig.jwt

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn: expiresIn,
        });

        return {
            user,
            token,
        };
    }
}

export default AuthUserService;
