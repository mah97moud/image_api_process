import supertest from 'supertest'
import app from '../src/index'

const request = supertest(app)

describe('Test Endpoint responses', () => {
    // done is passed so supertest would know that the test is done so it disconnects from the server.
    it('Successful endpoint call', async () => {
        const response = await request.get(
            '/api/images?filename=encenadaport&width=500&height=200'
        )
        console.log(response.body)
        expect(response.status).toBe(200)
        // done()
    })

    it('File not found', async () => {
        const response = await request.get('/api/images')
        console.log(response.body)
        expect(response.status).toBe(404)
        // done()
    })
})
