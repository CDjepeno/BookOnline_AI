import { ValidationError } from "@nestjs/common";
import { UserDTO } from "../dtos/user.dtos";


export interface IUserRepository {

    createUser(user: UserDTO): Promise<string> | ValidationError[]
}

export const IUserRepository = Symbol('IUserRepository');