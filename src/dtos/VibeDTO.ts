class VibeDTO {
    content: string
    image: string | null
    authorId: number

    constructor({ content, image = null, authorId }) {
        this.content = content
        this.image = image
        this.authorId = authorId
    }
}

export default VibeDTO
