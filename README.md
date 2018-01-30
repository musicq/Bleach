# Bleach

Bleach's aim is to be a data analyze and visualization tool. It contains both server side and client side.

In fact, Bleach is a project that we just want to test new technology we have learnt. So you'll find out it will update irregular basis.

## Install

You should install [yarn](https://yarnpkg.com) or [lerna](https://lernajs.io/) in your local first.

```shell
yarn install

# or use lerna
lerna bootstrap
```

Besides necessary dependencies, you also need to install [MongoDB](https://www.mongodb.com/) and start it, Because server needs a database to store data.

## Run

```shell
# start quickly
yarn start

# or you can run each manually
# run server
yarn run dev:client
# run client
yarn run dev:server
```

## Development

```shell
# compile code
yarn run compile
```

This will compile both server and client code. Then, you need to start server to develop. You can use `nodemon` or `node-dev` or whatever you like to start server from `packages/server/release/index.js`.
