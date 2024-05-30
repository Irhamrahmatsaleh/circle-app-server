import bcrypt from 'bcrypt'
import { SALT_ROUND } from '../configs/config'

class Hasher {
    hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, Number(SALT_ROUND))
    }
}

export default new Hasher()
