import { ServiceResponseType } from '../types/types'

class ServiceResponseDTO<T> {
    error: boolean
    message: object
    data: T | null

    constructor({ error, message, data }: ServiceResponseType<T>) {
        this.error = error
        this.message = message
        this.data = data
    }
}

export default ServiceResponseDTO
