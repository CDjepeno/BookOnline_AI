import { ObjectId } from "../types";

export interface UserI {
  _id: ObjectId;
  email: string;
  password: string;
  name: string;
  phone: number;
}
