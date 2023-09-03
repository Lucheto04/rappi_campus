import rateLimit from 'express-rate-limit';

export const limitReq = () => {
    return rateLimit({
        windowMs: 60 * 1000,
        max: 10,
        standardHeaders: true,
        legacyHeaders: false,
        skip: (req, res) => {
            if (req.headers['content-length'] > 400) {
                res.status(413).send({
                    status: 413,
                    message: 'The size of the request exceeds the limit'
                });
                return true;
            } 
        },
        message:'Too many requests :C'
    });
}