import {prismaClient} from "../application/database.js";
import {ResponseError} from "../error/response_error.js";
import {validate} from "../validation/validation.js";
import {loginUserValidation} from "../validation/user_validation.js";
import { v4 as uuid } from 'uuid';

const login = async (request) => {
    const loginRequest = validate(loginUserValidation, request);

    const user = await prismaClient.user.findUnique({
        where: {
            username: loginRequest.username
        },
        select: {
            username: true,
            name: true,
            role: true,
            password: true
        }
    });

    if (!user) {
        throw new ResponseError(401, "Username or password wrong");
    }

    if (loginRequest.password !== user.password) {
        throw new ResponseError(401, "Username or password wrong");
    }

    const token = uuid().toString();

    return prismaClient.user.update({
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {
            token: true,
            username: true,
            name: true,
            role: true
        }
    })
}

export default {
    login
}