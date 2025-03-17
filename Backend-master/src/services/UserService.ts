import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../interfaces/user.interface';
import { AuthTokenRepository } from '../repositories/AuthTokenRepository';

export class UserService {

    static async getUserDetails(id: string) {
        const user = await UserRepository.getUser(id);
        if(!user) throw new Error("User not found");
        return user;
    }

    static async registerUser({ firstName, lastName, email, phone, password }: IUser) {
        const hash = await bcrypt.hash(password, 10);
        const user = await UserRepository.createUser({ firstName, lastName, email, phone, password: hash });
        if(!user) throw new Error("User not created");
        return user;
    }
    
    static async loginUser({ email, password }: {email: string, password: string}) {
        const user = await UserRepository.getUserByEmail(email);
        if(!user) throw new Error("User not found");
        const match = await bcrypt.compare(password, user.password);
        if(!match) throw new Error("Invalid password");
        const cookie = "Bearer " + jwt.sign({ id: user.id }, process.env.TOKEN_SECRET || '');
        const authtoken = cookie.split(" ")[1];
        await AuthTokenRepository.createAuthToken(authtoken);
        return cookie;

    }

    static async updateUser({id, password} : {id: string, password: string}) {
        const hash = await bcrypt.hash(password, 10);
        const user = await UserRepository.updateUser(id, hash);
        if(!user) throw new Error("User not updated");
        return user;
    }

    static async deleteUser({id} : {id: string}) {
        const user = await UserRepository.deleteUser(id);
        if(!user) throw new Error("User not deleted");
        return user;
    }
}