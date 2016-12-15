ExpressJS Bootstrap
===============

Kickoff for [ExpressJS](expressjs.com) applications.

## First steps

#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)
Nvm approach is preferred.

#### Getting the dev dependencies
Run ```npm install``` from rootpath of the project.

#### Database configuration
Before running the app, make sure you must have a postgres db created. Then, set the `$NODE_API_DB_URL` environmental variable. It should look something like: `postgres://username:password@host:port/databasename`.
For more information feel free to glance at the [`app/orm.js`](https://github.com/Wolox/express-js-bootstrap/blob/master/app/orm.js#L6) file.

#### Starting your app
Now, to start your app run ```npm run front``` in the rootpath of the project to compile the frontend files and watch for changes. Then, to start the server, run ```npm start``` in the same directory. Then access your app at **localhost:port**. The port is logged in the console where you ran the start script.

## Development

#### Environments
By default, the environment will be **staging**, but you can easily change it using the **NODE_ENV** environmental variable.

#### Debugging
As we know, a NodeJS application is not something easy to debug and because of that we've added the [devtool](https://github.com/Jam3/devtool) package to make it simpler. It will get started when running your app using the start script (`npm start`), making your debugging easier with some of the features of Chrome DevTools.

## Deploy

#### Heroku
Pushing the desired branch to heroku should be enough.
For more information check: https://devcenter.heroku.com/articles/getting-started-with-nodejs#define-a-procfile.
 project.

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## About

This project is maintained by [Michel Agopian](https://github.com/mishuagopian) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)

## License

**express-js-bootstrap** is available under the MIT [license](LICENSE).

    Copyright (c) 2016 Michel Agopian <michel.agopian@wolox.com.ar>

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
