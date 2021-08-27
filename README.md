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

- Supports merging of multiple PDF files.

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

## API

* `GET /image`

Generate screenshot.

```bash
curl --location --request GET \
'http://localhost:5000/image?url=https://www.baidu.com' \
--output test-image.png
```

* `GET /simple-pdf`

Generate pdf.

```bash
curl --location --request GET \
'http://localhost:5000/simple-pdf?url=https://www.google.com/' \
--output test-simple-pdf.pdf
```

* `POST /pdf`

Generate pdf with elements such as headers and footers.

```bash
curl --location --request POST 'http://localhost:5000/pdf' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=http://www.google.com' \
--data-urlencode 'cookies[0].name=token' \
--data-urlencode 'cookies[0].value=9s2d4c16-f072-16eg-b134-0642ap190006' \
--data-urlencode 'cookies[0].domain=www.google.com' --output test-complex-pdf.pdf
```

* `POST /combine-pdf`

Merge multiple PDF files into one file.

See [Merge Test](https://github.com/pdsuwwz/puppeteer-server/blob/7e7394eea0963982342b480ddf98266f5e6f46f4/__test__/axios-node.js)


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

# License

[MIT](LICENSE)
