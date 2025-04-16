import bcrypt from 'bcryptjs'
import prisma from "../lib/prisma.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const hashPassword = await bcrypt.hash(password, 10)

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        })
        res.status(201).json({ message: "User created successfully",newUser })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}



export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await prisma.user.findFirst({ where: { username } });

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const age = 60 * 60 * 24 * 7;
        const token = jwt.sign({ id: user.id ,isAdmin:true}, process.env.JWT_SECRET_KEY, { expiresIn: age });

        const userFound = {
            username: user.username,
            email: user.email,
            id: user.id,
            createdAt: user.createdAt,
        }
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age * 1000,
        }).status(200).json({ message: "Login successful",userFound });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


export const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout successful" });
}

