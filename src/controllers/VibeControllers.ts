import { Request, Response } from 'express'

class VibeControllers {
    getAll(req: Request, res: Response) {
        res.json({
            message: 'Ok!',
        })
    }
}

export default new VibeControllers()
