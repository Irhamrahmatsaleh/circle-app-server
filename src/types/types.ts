export interface UserType {
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

export interface VibeType {
    id: number
    content: string
    image: string
    totalReply: number
    createdAt: Date
    updatedAt: Date
    authorId: number
}

export interface VibeDTOType {
    content: string
    image?: string
    authorId: number
}

export interface ServiceResponseType<T> {
    error: boolean
    message: object
    data: T | null
}
