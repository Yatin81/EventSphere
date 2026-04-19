import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utlis/jwt";

export const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) throw new Error();

    const decoded = verifyToken(token);
    req.user = decoded;

    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
};