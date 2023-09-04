

// @Injectable()
// export class UsersService implements UserRepository {
//   constructor(private typeorm: Repository<User>) {}

//   async createUser(user: UserDTO): Promise<void> {
//     const newUser = this.typeorm.create()
//   }
// }

// async createUser(user: UserDTO) {
//   try {
//     const newUser = this.typeorm.create(user);
//     const err = await validate(newUser);
//     if (err.length > 0) {
//       return err;
//     } else {
//       await this.typeorm.save(newUser);
//       return 'New User';
//     }
//   } catch (error) {
//     throw new Error(error);
//   }
// }
