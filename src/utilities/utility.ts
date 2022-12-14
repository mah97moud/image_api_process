import fs from 'fs';
import path from 'path';

const routPath = path.resolve('./');
const cacheDir = `${routPath}/cache/images`;

function createDirection(): void {
  try {
    if (
      fs.existsSync(cacheDir) ||
      fs.mkdirSync(cacheDir, { recursive: true })
    ) {
      console.log('Folders already exists');
    } else {
      fs.access(cacheDir, () => {
        fs.mkdir(cacheDir, { recursive: true }, (err) => {
          if (err) {
            throw err;
          }

          console.log('Folders created');
        });
      });
    }
  } catch (error: unknown) {
    console.log('Error creating folder');
  }
}

export default createDirection;
