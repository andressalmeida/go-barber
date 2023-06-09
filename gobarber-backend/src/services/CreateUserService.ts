import { AppDataSource } from "../data-source";
import { Users } from "../models/Users";
import { hash } from "bcryptjs";
import AppError from "../errors/AppError";

interface Request {
    name: string;
    email: string;
    password: string;
}

class CreateUserService {
    public async execute({ name, email, password }: Request): Promise<Users> {
        const usersRepository = AppDataSource.getRepository(Users);

        const checkUserExists = await usersRepository.findOne({
            where: { email },
        });

        if (checkUserExists) {
            throw new AppError("Email address already used");
        }

        const hashedPass = await hash(password, 8);

        const user = usersRepository.create({
            name,
            email,
            password: hashedPass,
        });

        await usersRepository.save(user);

        return user;
    }
}

export default CreateUserService;
