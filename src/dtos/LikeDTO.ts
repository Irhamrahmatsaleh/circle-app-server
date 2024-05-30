class LikeDTO {
    authorId: number
    vibeId: number

    constructor({ authorId, vibeId }) {
        this.authorId = authorId
        this.vibeId = vibeId
    }
}

export default LikeDTO
