import supertest from 'supertest'
import app from '../src/index'

const request = supertest(app)

describe('Test Endpoint responses', () => {
    // done is passed so supertest would know that the test is done so it disconnects from the server.
    it('Successful endpoint call', async () => {
        const response = await request.get(
            '/api/images?filename=encenadaport&width=500&height=200'
        )
        expect(response.status).toBe(200)
        // done()
    })

    it('File not found', async () => {
        const response = await request.get('/api/images')

        expect(response.status).toBe(400)
        // done()
    })

    it('width Error', async () => {
        const response = await request.get(
            '/api/images?filename=encenadaport&width=-500&height=200'
        )
        expect(response.text).toBe('please enter a valide width ')
        // done()
    })

    it('Height Error', async () => {
        const response = await request.get(
            '/api/images?filename=encenadaport&width=500&height=-200'
        )
        expect(response.text).toBe('please enter a valide height ')
        // done()
    })
})
