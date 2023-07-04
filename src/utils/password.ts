import { compare, hash } from 'bcrypt';

export const createPasswordHashed = async (
    password: string
): Promise<string> => {
    const saltOrRound = 10;
    return hash(password, saltOrRound);
}

export const validatePassword = async (password: string , passwordHash:  string): Promise<boolean> => {
    return compare(password, passwordHash);
}