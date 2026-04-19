import { User } from "@prisma/client";

export interface IAuthRepository {
  findByEmail(email: string): Promise<User | null>;
  createUser(data: any): Promise<User>;
}
