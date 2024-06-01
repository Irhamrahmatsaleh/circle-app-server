export interface UserType {
    id: number
    username: string
    email: string
    name: string
    password?: string
    avatar: string
    bio: string
    createdAt: Date
    updatedAt: Date
    isFollowed?: boolean
}

export interface VibeType {
    id: number
    content: string
    image: string
    createdAt: Date
    updatedAt: Date
    authorId: number
}

export interface ReplyType {
    id: number
    image: string
    content: string
    authorId: number
    targetId: number
    createdAt: Date
    updatedAt: Date
}

export interface LikeType {
    id: number
    authorId: number
    targetId: number
    createdAt: Date
    updatedAt: Date
}

export interface FollowType {
    id: number
    targetId: number
    ownerId: number
    createdAt: Date
    updatedAt: Date
}

export interface ServiceResponseType<T> {
    error: boolean
    payload: T | object
}

export interface UserWithFollowersType extends UserType {
    followers?: FollowType[]
}

export interface VibeWithDetailType extends VibeType {
    replies?: ReplyType[]
    likes?: LikeType[]
    totalReplies?: number
    totalLikes?: number
}
