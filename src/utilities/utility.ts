import sharp from 'sharp'

async function getImageData() {
    try {
        const data = await sharp('assets/images/encenadaport.jpg').metadata()
    } catch (error) {
        console.log(`An Error Has Occurred ${error}`)
    }
}

export default getImageData
