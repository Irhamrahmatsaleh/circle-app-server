class UserDTO {
    id: number
    username: string | null
    name: string | null
    avatar: string | null
    bio: string | null

    constructor({ id, username = null, name = null, avatar = null, bio = null }) {
        this.id = id
        this.username = username
        this.name = name
        this.avatar = avatar
        this.bio = bio
    }
}

export default UserDTO
