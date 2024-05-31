class FollowsDTO {
    followingId: number
    followerId: number

    constructor({ followingId, followerId }) {
        this.followingId = followingId
        this.followerId = followerId
    }
}

export default FollowsDTO
