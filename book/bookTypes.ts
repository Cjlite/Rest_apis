import { User } from "../src/users/userTypes";

export interface Book {
  _id: string;
  title: string;
  auther: User;
  genre: string;
  coverImage: string;
  file: string;
  createdAt: Date;
  updatedAt: Date;
}
