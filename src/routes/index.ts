import express from 'express'
import images from './api/images'

const routes = express.Router()

routes.use('/api', images)

export default routes
