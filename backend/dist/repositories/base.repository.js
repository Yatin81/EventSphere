import { prisma } from "../lib/prisma";
export class BaseRepository {
    db = prisma;
}
