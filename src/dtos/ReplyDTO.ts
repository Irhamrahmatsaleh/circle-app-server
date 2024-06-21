class ReplyDTO {
    image: string | null
    content: string
    badLabels: string[]
    authorId: number
    targetId: number

    constructor({ image = null, content, badLabels = [], authorId, targetId }) {
        this.image = image
        this.content = content
        this.badLabels = badLabels
        this.authorId = authorId
        this.targetId = targetId
    }
}

export default ReplyDTO
