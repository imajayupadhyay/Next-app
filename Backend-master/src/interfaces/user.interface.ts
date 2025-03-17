export interface IUser {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}