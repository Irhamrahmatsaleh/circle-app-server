class RegisterDTO {
    username: string
    email: string
    name: string
    password: string
    avatar?: string
    banner?: string
    bio?: string

    constructor({ username, email, name, password, avatar = null, banner = null, bio = null }) {
        this.username = username
        this.email = email
        this.name = name
        this.password = password
        this.avatar = avatar
        this.banner = banner
        this.bio = bio
    }
}

export default RegisterDTO
