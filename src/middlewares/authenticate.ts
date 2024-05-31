import { Request, Response, NextFunction } from 'express'
import { SECRET_SAUCE } from '../configs/config'
import jwt from 'jsonwebtoken'

function authenticate(req: Request, res: Response, next: NextFunction) {
    const headers = req.headers.authorization

    if (!headers || !headers.startsWith('Bearer')) {
        return res.sendStatus(401)
    }

    const token = headers && headers.split(' ')[1]

    jwt.verify(token, SECRET_SAUCE, (error, user) => {
        if (error) {
            return res.sendStatus(401)
        }

        res.locals.user = user
        next()
    })
}

export default authenticate
