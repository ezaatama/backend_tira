import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).json({ errors: "Unauthorized" });
    }

    const user = await prismaClient.user.findFirst({ where: { token } });

    if (!user) {
        return res.status(401).json({ errors: "Unauthorized" });
    }

    req.user = user;
    next();
};

export const adminMiddleware = async (req, res, next) => {
    const token = req.get('Authorization');
    if (!token) {
        return res.status(401).json({ errors: "Unauthorized: Token required" });
    }

    const user = await prismaClient.user.findFirst({
        where: { token },
        select: {
            username: true,
            name: true,
            role: true,
            token: true
        }
    });

    if (!user) {
        return res.status(401).json({ errors: "Unauthorized: Invalid token" });
    }

    if (user.role !== "ADMIN") {
        return res.status(403).json({ errors: "Forbidden: Admin access required" });
    }

    req.user = user;
    next();
};
