import express from 'express';
import fs from 'fs';
import path from 'path';
import utility from '../../utilities/utility';
import cropImage from '../../utilities/sharp_utility';

const images = express.Router();
const routPath = path.resolve('./');

type Query = {
  filename: string;
  width: number;
  height: number;
};

images.get('/images', (req: express.Request, res: express.Response): void => {
  const q: Query = {
    filename: req.query.filename as unknown as string,
    width: parseInt((req.query.width as unknown as string) ?? '100', 10),
    height: parseInt((req.query.height as unknown as string) ?? '100', 10),
  };

  const fileLocation = `${routPath}/assets/images/${q.filename}.jpg`;
  const cacheLocation = `${routPath}/cache/images/${q.filename}`;

  if (q.filename === undefined) {
    res
      .status(400)
      .send(
        'please enter a valide url like https://localhost.com:3000/api/images?filename=imagename&width=100&height=100'
      );
    return;
  }

  if (q.width < 0) {
    res.send('please enter a valide width ');
    return;
  }

  if (q.height < 0) {
    res.send('please enter a valide height ');
    return;
  }

  utility();

  fs.access(fileLocation, fs.constants.F_OK, (err) => {
    if (err) {
      res.status(400).send('File not found');
    } else {
      fs.access(
        `${cacheLocation}${q.width}x${q.height}.jpg`,
        fs.constants.F_OK,
        (err) => {
          if (err) {
            console.log('Not Caching image');
            console.log(`file location ${fileLocation}`);

            cropImage(fileLocation, q.width, q.height, cacheLocation)
              .then(() => {
                res.sendFile(`${cacheLocation}${q.width}x${q.height}.jpg`);
              })
              .catch((err) => {
                res.status(400).send(err);
              });

            // Sharp(fileLocation)
            //     .resize(q.width, q.height)
            //     .toFile(
            //         `${cacheLocation}${q.width}x${q.height}.jpg`,
            //         (err: Error, info: sharp.OutputInfo) => {
            //             if (err) {
            //                 res.status(400).send(err)
            //                 console.log(err)
            //             } else {
            //                 console.log(`Info ${info}`)
            // res.sendFile(
            //     `${cacheLocation}${q.width}x${q.height}.jpg`
            // )
            //             }
            //         }
            //     )
          } else {
            console.log('Caching image');
            res.sendFile(`${cacheLocation}${q.width}x${q.height}.jpg`);
          }
        }
      );
    }
  });
});

export default images;
