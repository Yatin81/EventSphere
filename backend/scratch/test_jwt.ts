import jwt from "jsonwebtoken";
try {
    const token = jwt.sign({ id: 1 }, undefined as any);
    console.log("Token:", token);
} catch (e) {
    console.log("Error:", e);
}
