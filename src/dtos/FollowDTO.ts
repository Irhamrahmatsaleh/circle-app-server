class FollowDTO {
    targetId: number
    ownerId: number

    constructor({ targetId, ownerId }) {
        this.targetId = targetId
        this.ownerId = ownerId
    }
}

export default FollowDTO
