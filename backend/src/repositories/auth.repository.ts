import { BaseRepository } from "./base.repository";
import { IAuthRepository } from "../interfaces/IAuthRepository";
import { User } from "@prisma/client";

export class AuthRepository extends BaseRepository implements IAuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return this.db.user.findUnique({
      where: { email }
    });
  }

  async createUser(data: any): Promise<User> {
    return this.db.user.create({
      data
    });
  }
}