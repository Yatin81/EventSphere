import bcrypt from "bcrypt";
import { generateToken } from "../utlis/jwt";
export class AuthService {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async signup(email, password, role) {
        const exists = await this.repo.findByEmail(email);
        if (exists)
            throw new Error("User exists");
        const hashed = await bcrypt.hash(password, 10);
        const user = await this.repo.createUser({
            email,
            password: hashed,
            role
        });
        const token = generateToken({
            id: user.id,
            role: user.role
        });
        return { user, token };
    }
    async login(email, password) {
        const user = await this.repo.findByEmail(email);
        if (!user)
            throw new Error("Invalid credentials");
        const match = await bcrypt.compare(password, user.password);
        if (!match)
            throw new Error("Invalid credentials");
        const token = generateToken({
            id: user.id,
            role: user.role
        });
        return { user, token };
    }
}
