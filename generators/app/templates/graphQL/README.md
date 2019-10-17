# graphql

graphql

## Usage

This bootstrap operates under the following structure for implementing the ```graphql``` schema modularly:

- app/graphql/
  + index.js
  + scripts.js
  + module1
  + module2
  + ...modulex

Each module should be a folder containing the following:

- app/graphql/modulex/
  + type_defs.js (or schema.js)
  + resolvers.js
  + middlewares.js (add it if you need to use middlewares)

## First steps

#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred.

#### Getting dependencies
Run ```npm install``` or ```yarn``` from rootpath of the project.


#### Database configuration
Before running the app, make sure you have [postgresql installed](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-14-04) and a db created, to create it run the following steps inside a psql terminal:
1. CREATE DATABASE db_project_name;
2. \c db_project_name
3. CREATE ROLE "project_name" LOGIN CREATEDB PASSWORD 'project_name';

Then, set in `.env` some variables:
- DB_HOST=localhost
- DB_PORT=5432
- DB_USERNAME=project_name
- DB_PASSWORD=project_name
- DB_NAME=db_project_name
- DB_NAME_DEV=db_project_name_dev
- DB_NAME_TEST=db_project_name_test

### Migrations

To create a migration, run `./node_modules/.bin/sequelize migration:create --name="my-migration-name" --config ./migrations/config.js --migrations-path ./migrations/migrations`.

To run them, execute `npm run migrations`.

#### Starting your app
Now, to start your app run ```npm start``` in the rootpath of the project. Then access your app at **localhost:port**. The port is logged in the console where you ran the start script.

## Development

#### Environments
By default, the environment will be **development**, but you can easily change it using the **NODE_ENV** environmental variable.

#### Environment variables
`Dotenv` is used for managing environment variables. They are stored in the `/.env` file. Take into account that the variables defined in the `bashrc` are not overrided.

The environment variables should be added to the `.env` file in the form of `NAME=VALUE`, as the following example:
```
DB_USERNAME=root
DB_PASS=superpass
DB_PASSWORD=superpass
PORT=8081
CLIENTS_API=http://api.clients.example.org/
```

**Remember not to push nor commit the `.env` file.**

#### Logging
To log useful information of your program to the console you just need to import the logger located at `app/logger`. There are two possible types of logging: `info` and `error`. You should use them depending on the type of message you want to show.

Here is an example snippet:
```
const logger = require('/app/logger');
...
if (error) { 
    logger.error('There is an error);
} else {
    logger.info('There is no error);
}
```

#### Testing

To run your tests you first need to config your testing database by setting the env var `DB_NAME_TEST`. as explained
before in [Database configuration](#database-configuration). Also you need to run the migrations in this exclusive
testing database each time you have new ones, you can do this by running the command `npm run migrations-test`.
Once you have all the above done you can run your tests with the following command: `npm test`. For more information refeer to the documentation of [Mocha](https://mochajs.org/) and [Chai](https://www.chaijs.com/).

#### Debugging
As we know, a NodeJS application is not something easy to debug and because of that we've added the `--inspect` flag to make it simpler. Chrome DevTools will get started when running your app using the start script (`npm start`), making your debugging easier.

#### REPL console
We can use a node console with `npm run console`. There your service objects are exposed as _servicename_ + "Service". Let's suppose that we have a service `users` which has a function `getAll`. In your console you can call `usersService.getAll()` and see the result. Note that this works also with functions that return promises! To exit the console use `.exit`.

#### Documentation
Documentation will be served at `/docs`. Remember using [dictum.js](http://www.github.com/Wolox/dictum.js) package to automatically generate documentation for your endpoints. Check [this link](https://github.com/Wolox/dictum.js#chai) for further details.

## Deploy

#### Heroku
Pushing the desired branch to heroku should be enough.
For more information check: https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Run the tests (`npm test`)
4. Commit your changes (`git commit -am 'Add some feature'`)
5. Push to the branch (`git push origin my-new-feature`)
6. Create new Pull Request

## About

This project is maintained by [Wolox](https://github.com/wolox) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**graphql** is available under the MIT [license](LICENSE.md).

    Copyright (c) 2019 Wolox

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
    THE SOFTWARE.
