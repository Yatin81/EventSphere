import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET || "fallback_secret_for_development";
export const generateToken = (payload) => {
    if (!SECRET)
        throw new Error("JWT_SECRET is not defined");
    return jwt.sign(payload, SECRET, { expiresIn: "7d" });
};
export const verifyToken = (token) => {
    return jwt.verify(token, SECRET);
};
