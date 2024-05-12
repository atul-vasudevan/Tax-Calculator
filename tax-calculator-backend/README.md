## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start
$ npm run start:dev

## Test

```bash
# unit tests
$ npm run test

```bash
# migrations
$ npx typeorm-ts-node-commonjs migration:generate ./src/migrations/schema-update -d ./src/database/data-source.ts
$ npx typeorm-ts-node-commonjs migration:show -d ./src/database/data-source.ts
$ npx typeorm-ts-node-commonjs migration:run -d  ./src/database/data-source.ts
```
