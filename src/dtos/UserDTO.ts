class UserDTO {
    id: number
    username: string | null
    name: string | null
    filterContent: boolean
    avatar: string | null
    banner: string | null
    bio: string | null

    constructor({
        id,
        username = null,
        name = null,
        filterContent,
        avatar = null,
        banner = null,
        bio = null,
    }) {
        this.id = id
        this.username = username
        this.name = name
        this.filterContent = filterContent
        this.avatar = avatar
        this.banner = banner
        this.bio = bio
    }
}

export default UserDTO
