# Project Name

## Description
Coding task for Easy Generator.

## Notes
- NPM monorepo - I would generally use Yarn Workspaces but I wanted to keep this simple
- Has examples of all the tests but not full coverage
- Config could be better
- The components do not not run on HTTPS, if it was a production app it would

## Instructions
- in the root run `npm install`
- in the root run `docker-compose up` - in the main branch this will just start an instance on MongoDB
- cd into packages/backend
- create a `.env` file with:
    - PORT=5000
    - JWT_SECRET=ellie
    - MONGO_URI=mongodb://localhost:27018/eg-fullstack-test
- run `npm run start:dev`
- cd into packages/frontend and `run npm start`


## Docker Version
- check out the 'docker' branch
- in the root run `docker-compose up
