class VibeDTO {
    content: string
    image: string | null
    badLabels: string[]
    authorId: number

    constructor({ content, image = null, badLabels = [], authorId }) {
        this.content = content
        this.image = image
        this.badLabels = badLabels
        this.authorId = authorId
    }
}

export default VibeDTO
