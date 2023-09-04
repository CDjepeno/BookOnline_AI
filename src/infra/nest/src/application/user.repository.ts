import { Injectable } from "@nestjs/common";
import { UserDTO } from "src/dtos/user.dtos";

@Injectable()
export abstract class UserRepository {
    abstract createUser(user: UserDTO): Promise<void>
}