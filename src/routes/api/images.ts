import express, { request } from 'express'
import sharp from 'sharp'
import fs from 'fs'
import path from 'path'

const images = express.Router()
const routPath = path.resolve('./')

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

    const fileLocation = `${routPath}/assets/images/${q.filename}.jpg`
    const cacheLocation = `${routPath}/cache/images/${q.filename}`

    if (q.filename === undefined) {
        res.status(400).send(
            'please enter a valide url like https://localhost.com:3000/api/images?filename=imagename&width=100&height=100'
        )
        return
    }

    if (q.width < 0) {
        res.errored?.message
        res.send('please enter a valide width ')
        return
    }

    if (q.height < 0) {
        res.send('please enter a valide height ')
        return
    }

    fs.access(fileLocation, fs.constants.F_OK, (err) => {
        if (err) {
            res.status(400).send('File not found')
            return
        } else {
            fs.access(
                `${cacheLocation}${q.width}x${q.height}.jpg`,
                fs.constants.F_OK,
                (err) => {
                    if (err) {
                        console.log('Not Caching image')
                        sharp(fileLocation)
                            .resize(q.width, q.height)
                            .toFile(
                                `${cacheLocation}${q.width}x${q.height}.jpg`,
                                (err, info) => {
                                    if (err) {
                                        res.status(400).send(err)
                                    } else {
                                        res.sendFile(
                                            `${cacheLocation}${q.width}x${q.height}.jpg`
                                        )
                                    }
                                }
                            )
                        return
                    } else {
                        console.log('Caching image')
                        res.sendFile(
                            `${cacheLocation}${q.width}x${q.height}.jpg`
                        )
                    }
                }
            )
        }
    })

    // fs.access(
    //     `cache/images/${q.filename}${q.width}x${q.height}.jpg`,
    //     fs.constants.F_OK,
    //     (err) => {
    //         if (err) {
    //             console.error(err)
    //             sharp(`assets/images/${q.filename}.jpg`)
    //                 .resize(q.width, q.height)
    //                 .toFile(
    //                     `cache/images/${q.filename}${q.width}x${q.height}.jpg`,
    //                     (err, info) => {
    //                         res.send(
    //                             `
    //         <center>
    //         <h5> your new image with width ${q.width} and height ${q.height}</h5>
    //             <img src="http://localhost:3000/${q.filename}${q.width}x${q.height}.jpg?filename=${q.filename}&width=${q.width}&height=${q.height}" />
    //         </center>
    //         `
    //                         )
    //                     }
    //                 )
    //             console.log('Not Caching')
    //             return
    //         } else {
    //             res.send(
    //                 `
    // <center>
    // <h5> your new image with width ${q.width} and height ${q.height}</h5>
    //     <img src="http://localhost:3000/${q.filename}${q.width}x${q.height}.jpg?filename=${q.filename}&width=${q.width}&height=${q.height}" />
    // </center>
    // `
    //             )
    //             console.log('Caching')
    //             return
    //         }
    //     }
    // )

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
