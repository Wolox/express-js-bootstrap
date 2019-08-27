# Change Log

This project adheres to [Semantic Versioning](http://semver.org/).

## 0.2.0

* Changelog added.

## 0.1.0

* Now "npm run start-dev" starts the process with nodemon, "npm start" does "node server.js". The prestart validation now is called prestart-dev.
It is not really necessary to leave "node start" in the scripts section of package-lock.js, since the default behavior of nmp start when no start script is provided is to run "node server.js", but it was left there to make it more explicit.
