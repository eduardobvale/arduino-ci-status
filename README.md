arduino-ci-status
=========

[![Circle CI](https://circleci.com/gh/christian-fei/arduino-ci-status.svg?style=svg)](https://circleci.com/gh/christian-fei/arduino-ci-status)

Connects to [webhook-publisher](https://github.com/christian-fei/webhook-publisher) and displays Continuous integration build status through leds.

# Setup

Install dependencies with `npm install [--production]`

Specify the following environment variables to connect to the webhook-publisher:

- `WEBHOOK_PUBLISHER_HOST` as an ip or hostname (without protocol and port, e.g. localhost)
- `WEBHOOK_PUBLISHER_TCP_PORT` as the port where the webhook-publisher listens for TCP connections (e.g. 3001)

Example to run the program:

`WEBHOOK_PUBLISHER_HOST=localhost WEBHOOK_PUBLISHER_TCP_PORT=3001 node index.js`

# Development

`npm test` to run the tests

`npm run test-watch` to rerun the tests on file change
