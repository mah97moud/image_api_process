import cropImage from '../src/utilities/sharp_utility';
import path from 'path';

const routPath = path.resolve('./');

const fileLocation = `${routPath}/assets/images/encenadaport.jpg`;
const cacheLocation = `${routPath}/cache/images/encenadaport`;
const width = 500;
const height = 500;

describe('Test Sharp', () => {
  it('Image Resize', async () => {
    expect(cropImage(fileLocation, width, height, cacheLocation));
  });
});
