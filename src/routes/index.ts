import express from 'express'
import images from './images/images'

const routes = express.Router()

routes.get('/api', (req, res) => {
    res.send('Read File')
})

routes.use('/images', images)

export default routes
