class CircleError extends Error {
    error: string

    constructor({ error }) {
        super()
        this.error = error
    }
}

export default CircleError
