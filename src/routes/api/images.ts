import express from 'express'
import sharp from 'sharp'
import fs from 'fs'

const images = express.Router()

interface Query {
    filename: string
    width: number
    height: number
}

images.get('', (req, res) => {
    const q: Query = {
        filename: req.query['filename'] as unknown as string,
        width: parseInt((req.query['width'] as unknown as string) ?? '100'),
        height: parseInt((req.query['height'] as unknown as string) ?? '100'),
    }

    sharp(`assets/images/${q.filename}.jpg`)
        .resize(q.width, q.height)
        .toFile(`cache/images/${q.filename}.jpg`, (err, info) => {
            console.log(`File info ${info}`)
            if (err) {
                console.log(`Has Error ${err}`)
                res.status(404).send(
                    `
        <center>
        <h3>The following error has occurred ${err.message}</h3>
        <h3>please enter the following url form : http://localhost:3000/api/images?filename=imagename&width=200&height=200</h3>
          
        </center>
        `
                )
                return
            }

            res.send(
                `
    <center>
    <h3> your new image with width ${q.width} and height ${q.height}</h3>
        <img src="http://localhost:3000/${q.filename}.jpg" />
    </center>
    `
            )
        })

    // res.sendFile(`${__dirname}/assets/index.html`)

    // if (filename == undefined) {
    //     fs.access(`cache/images/${filename}.jpg`, fs.constants.F_OK, (err) => {
    //         if (err) {
    //             res.send(`The following error occurred: File missing `)
    //             return
    //         }
    //     })
    // }
})

export default images
