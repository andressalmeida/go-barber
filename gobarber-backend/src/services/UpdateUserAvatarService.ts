import path from "path";
import fs from "fs";
import { AppDataSource } from "../data-source";
import { Users } from "../models/Users";
import uploadConfig from "../config/upload";
import AppError from "../errors/AppError";

interface Request {
    user_id: string;
    avatarFilename: string;
}
class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<Users> {
        const usersRepository = AppDataSource.getRepository(Users);

        const user = await usersRepository.findOne({ where: { id: user_id } });

        if (!user) {
            throw new AppError("Only authenticated users can change avatar", 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar
            );
            const userAvatarExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
