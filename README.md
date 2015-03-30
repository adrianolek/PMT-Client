PMT Client
==========

[![Build Status](https://travis-ci.org/adrianolek/PMT-Client.svg?branch=master)](https://travis-ci.org/adrianolek/PMT-Client)

A client for [Project Management Tool](https://github.com/adrianolek/PMT), which can be used as a Chrome App.

Installation
------------

You will need [Node.js](https://nodejs.org/download/) to build the application.
First install dependencies using npm:

    npm install

After Node.js packages installation is done, Bower will automatically install required web packages.

In case you need to reinstall the Bower packages you can do it by issuing:

    node_modules/bower/bin/bower install

Build
-----

To build the application simply run:

    npm run-script build

The built application will be stored in the `build` directory.

Additionally there is a `dist` script:

    npm run-script build

which will build the app and pack it into a zip file into the `dist` directory.

Run
---

After building the application you can run it via:

    google-chrome --load-and-launch-app=build

To be able to use the app, you will need a [Project Management Tool](https://github.com/adrianolek/PMT) running somewhere.

Test
----

In order to run the test suite use:

    npm run-script test-single-run

You can also start the Karma test runner with files auto watch by:

    npm test
