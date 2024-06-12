import { Prisma } from '@prisma/client'

interface SearchDTO {
    keyword: string | Prisma.FieldRef<'User', 'String'>
}

export default SearchDTO
