import { ValidationError } from "@nestjs/common";
import { UserDTO } from "../user.dtos";


export interface IUserRepository {

    createUser(user: UserDTO): Promise<string> | ValidationError[]
}