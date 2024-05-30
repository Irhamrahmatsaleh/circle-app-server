class UserDTO {
    username: string
    email: string
    name: string
    password: string
    avatar?: string
    bio?: string

    constructor({ username, email, name, password, avatar = null, bio = null }) {
        this.username = username
        this.email = email
        this.name = name
        this.password = password
        this.avatar = avatar
        this.bio = bio
    }
}

export default UserDTO
