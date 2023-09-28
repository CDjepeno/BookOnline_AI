import { UserModel } from "src/domaine/model/user.model";
import { UsersRepository } from "src/domaine/repositories/user.repository";
import { userDataResponse } from "../userData";

export class MockUserProvider implements UsersRepository {
    createUser(): Promise<UserModel> {
        return Promise.resolve(userDataResponse)
    }

}