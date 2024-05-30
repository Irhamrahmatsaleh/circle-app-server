class ReplyDTO {
    image: string | null
    content: string
    authorId: number
    vibeId: number

    constructor({ image = null, content, authorId, vibeId }) {
        this.image = image
        this.content = content
        this.authorId = authorId
        this.vibeId = vibeId
    }
}

export default ReplyDTO
