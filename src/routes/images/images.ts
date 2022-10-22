import express from 'express'
import f from '../../utilities/utility'
import sharp from 'sharp'

const images = express.Router()

images.get('/', (req, res) => {
    const filename: string = req.query['filename'] as unknown as string
    const width = req.query['width'] as unknown as string
    const height = req.query['height'] as unknown as string

    //width="500" height="600" G:\Desktop\image_api\image_api_process\assets\images\encenadaport.jpg

    f()
        .then((value) => {
            console.log(`Your Data is ${value}`)
        })
        .catch((error) => {
            console.log(`Error ${error}`)
        })
    sharp(`assets/images/${filename}.jpg`)
        .resize(parseInt(width), parseInt(height))
        .toFile(`cache/images/${filename}.jpg`, (err, info) => {
            res.send(`
                 <center>
                    <img src="http://localhost:3000/${filename}.jpg?filename=${filename}&width=${info.width}&height=${info.height}" >
                 </center>
    `)
        })
})

export default images
