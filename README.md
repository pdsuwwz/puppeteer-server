# Puppeteer Server

Koa + TypeScript + Rollup + Puppeteer

## Prerequisites

Please make sure that [Node.js](https://nodejs.org/) (>= 10.18.1) is installed on your operating system.

## Feature

- Separation business logic and Controllers.

- The best practice for Puppeteer project.

- Configured routing.

- Eslint configuration.

- Fast build with Rollup.

- Extensible PDF watermark, header and footer.

- HMR.

## Project structure

```
├── src
│   ├── controllers  ---  Server controllers
│   ├── services     ---  Server services
│   ├── config.ts    ---  About Environments variable
│   ├── main.ts      ---  Entry file
│   └── routes.ts    ---  Configs for routing controllers
```

## Installation

```bash
yarn install
```

## Running Development

```bash
yarn dev
```

## Running Production

The project has built-in a `pm2`, running the `yarn start` will automatically manage the process by `pm2`.

```bash
yarn start
```

## Routing

In order to make the routing information more readable and transparent, the form of configuration is adopted here.

You can create an `array` and then write the routing meta information into the `array`, and reuse it in the `src/routes.ts`

```ts
const routes: Array<routeConfig> = [
  {
    path: '/',
    method: 'get',
    action: homeController.hello
  },
  // here...
]
```

## License

[MIT](LICENSE)
