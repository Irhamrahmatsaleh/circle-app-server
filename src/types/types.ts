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

export interface ReplyType {
    id: number
    image: string
    content: string
    authorId: number
    vibeId: number
    createdAt: Date
    updatedAt: Date
}

export interface LikeType {
    id: number
    authorId: number
    vibeId: number
    createdAt: Date
    updatedAt: Date
}
