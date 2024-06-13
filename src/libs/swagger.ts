import swaggerAutogen from 'swagger-autogen'
import { HOST } from '../configs/config'

const doc = {
    openapi: '3.0.0',
    info: {
        title: 'CIRCLE APP API',
        description: 'An API made for Circle App.',
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
    host: HOST,
}

const outputFile = './swagger.json'
const routes = ['../index.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc).then(() => {
    console.log('Swagger doc generated.')
})
