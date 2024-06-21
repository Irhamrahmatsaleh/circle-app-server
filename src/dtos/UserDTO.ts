class UserDTO {
    id: number
    username: string | null
    name: string | null
    avatar: string | null
    banner: string | null
    bio: string | null

    constructor({ id, username = null, name = null, avatar = null, banner = null, bio = null }) {
        this.id = id
        this.username = username
        this.name = name
        this.avatar = avatar
        this.banner = banner
        this.bio = bio
    }
}

export default UserDTO
