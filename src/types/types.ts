export interface User {
    id: number
    username: string
    email: string
    name: string
    password: string
    avatar: string
    bio: string
    createdAt: Date
    updatedAt: Date
}

export interface Vibe {
    id: number
    content: string
    image: string
    totalReply: number
    createdAt: Date
    updatedAt: Date
    authorId: number
}

export interface ServiceResponse<T> {
    error: boolean
    message: object
    data: T | null
}
