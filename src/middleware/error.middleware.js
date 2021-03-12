const errorMiddleware = (error, req, res, next) => {
    let {status = 500, message, data} = error;

    console.log(`[Error] ${error}`);

    // reconstruct the message if the status is 500
    const message = status === 500 || !message ? `Internal server error` : message;

    // recreate the error
    error = {
        type: 'error',
        status,
        message,
        ...(data) && data
    }

    // return the error
    res.status(status).send(error);

}

module.exports = errorMiddleware;