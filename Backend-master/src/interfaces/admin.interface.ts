export interface IAdmin {
    id?: string;
    email: string;
    password: string;
    secretKey: string;
    createdAt?: Date;
    updatedAt?: Date;
}