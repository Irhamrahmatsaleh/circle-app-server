export interface Vibe {
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

export interface ServiceResponse<T> {
    error: boolean
    message: object
    data: T | null
}
