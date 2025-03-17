export interface IPractice {
    id?: string;
    questions: string;
    options: string[];
    level: string;
    tag: string;
    answer: string;
    type: string;
    createdAt?: Date;
    updatedAt?: Date;
}