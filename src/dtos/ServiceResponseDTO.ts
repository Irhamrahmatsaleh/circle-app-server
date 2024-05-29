class ServiceResponseDTO<T> {
    error: boolean
    payload: T | null

    constructor({ error, payload }) {
        this.error = error
        this.payload = payload
    }
}

export default ServiceResponseDTO
