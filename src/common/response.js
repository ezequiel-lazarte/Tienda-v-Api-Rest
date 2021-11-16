const createError = require('http-errors');

module.exports.Response = {
    success: (res, status = 200, messagge = "Ok", body = {}) => {
        res.status(status).json({messagge, body});
    },
    error: (res, error = null) => {
        const {statusCode, message} = error ? error : new createError.InternalServerError();
        res.status(statusCode).json({ message });
    }
}