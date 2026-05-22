
import config from "../../config/env.config";
import { pool } from "../../db";
import type { IJwtPayload } from "../../types/jwtPayload.interface";
import type { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

const createUser = async(payload: IUser) =>{

    const {name, email, password, role} = payload;

    const hashedPassword = bcrypt.hashSync(password, 12);

    const result = await pool.query(
        `
        INSERT INTO users(name, email, password, role) VALUES($1, $2, $3, $4) RETURNING *
        `,
        [name, email, hashedPassword, role]
    );
    
    delete result.rows[0].password
    return result.rows[0];
}

const loginUser = async(payload : { email: string; password: string }) => {
    const {email, password} = payload;

    const result = await pool.query(
        `
        SELECT * FROM users WHERE email = $1
        `, [email]
    )

    if(result.rows.length === 0 ){
        throw new Error("Invalid email or password")
    }

    const user = result.rows[0];

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if(!isPasswordValid){
        throw new Error("Invalid email or password")
    }

    delete user.password;

    const jwtPayload : IJwtPayload={
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
    }

    const accessToken = jwt.sign(jwtPayload, config.jwt_secret as string, { expiresIn: "1d" })

    return {
        token : accessToken,
        user: user
    }
}    

export const userService = {createUser, loginUser};