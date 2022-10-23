import express from 'express'
import routes from './routes/index'

const app = express()
const port = 3000

app.use('/api', routes)

// app.use(express.static('assets'))

// app.use(express.static('cache/images'))

app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`)
})

export default app
