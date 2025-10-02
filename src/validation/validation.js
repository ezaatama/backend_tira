import { ResponseError } from "../error/response_error.js";

const validate = (schema, request) => {
    const result = schema.validate(request, {
        abortEarly: false,
        //Jika ada field yang tidak diketahui disertakan maka akan otomatis direject jika menggunakan allowUknown
        allowUnknown: false,
    })

    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}

export {validate}