import sharp from 'sharp';

async function cropImage(
  fileLocation: string,
  imageWidth: number,
  imageHeight: number,
  cacheLocation: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    sharp(fileLocation)
      .resize(imageWidth, imageHeight)
      .toFile(
        `${cacheLocation}${imageWidth}x${imageHeight}.jpg`,
        (err: Error, info: sharp.OutputInfo) => {
          if (err) {
            // Res.status(400).send(err)
            reject(err);
            console.log(err);
          } else {
            resolve();
            console.log(info);
            // Res.sendFile(
            //     `${cacheLocation}${q.width}x${q.height}.jpg`
            // )
          }
        }
      );
  });
}

export default cropImage;
