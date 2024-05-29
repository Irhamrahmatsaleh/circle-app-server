class ControllerResponseDTO<T> {
    error: boolean
    message: object
    data: T | null

    constructor({ error, message, data }) {
        this.error = error
        this.message = message
        this.data = data
    }
}

export default ControllerResponseDTO
