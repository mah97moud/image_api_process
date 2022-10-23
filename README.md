# image_api_process

Open image and change size uing endpoint

<!-- packages used -->

1- ts-node
2- typescript
3- eslint
4- eslint-config-prettier
5- eslint-plugin-prettier
6- jasmine
7- supertest
8- nodemon
9- express
10- sharp
11- prettier

<!-- The scripts -->

1- for build script --> npm run build
2- for test script --> npm run test
3- for start script --> npm run start

<!-- End points for image process -->

1- if http://localhost:3000/api/images
please enter a valide url like https://localhost.com:3000/api/images? filename=imagename&width=100&height=100'

2- if http://localhost:3000/api/images/?filename=encenadaport then default image will with width and height = 100

3- if http://localhost:3000/api/images?filename=encenadaport&width=300&height=300 new image will be created with width=300 and height=300

4- if http://localhost:3000/api/images?filename=&width=300&height=300
please enter a valide url like https://localhost.com:3000/api/images?filename=imagename&width=100&height=100'

5- if http://localhost:3000/api/images/?filename=encenadaport
Original image will be loaded from assets folder

6- if http://localhost:3000/api/images/?filename=
File not found

7-if http://localhost:3000/api/images?filename=encenadaport&width=-300&height=300
please enter a valide width

8-if http://localhost:3000/api/images?filename=encenadaport&width=300&height=-300
please enter a valide height
