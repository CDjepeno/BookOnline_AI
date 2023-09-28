import { CreateUserUseCase } from "src/application/usecases/create.user.usecase";
import { MockClientProvider } from "../../data/mock/mock.client.provider";
import { MockUserProvider } from "../../data/mock/mock.user.provider";
import { CreateUserDto } from '../../../../domaine/model/user.dtos';




export const createFixture = () => {
     const userProvider = new MockUserProvider();
    const clientProvider = new MockClientProvider();
    const createUserCase = new CreateUserUseCase(userProvider, clientProvider);


    return {
    async whenCreateUser(createUserDto: CreateUserDto) {
        try {
           await createUserCase.execute(createUserDto)
        } catch (err) {
            throw new Error(err)
        }
     }
    }
  }
  
  export type Fixture = ReturnType<typeof createFixture>;