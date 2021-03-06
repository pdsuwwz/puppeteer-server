# Puppeteer Server
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpdsuwwz%2Fpuppeteer-server.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpdsuwwz%2Fpuppeteer-server?ref=badge_shield)

English | [δΈ­ζ](README-zh.md)

## Introduction

> π¦© Koa + TypeScript + Rollup + Puppeteer

* Fast Generate into PDF and images from any webpage.

* Support merge multiple webpages into one PDF file, injection of Cookies, Watermark addition and Header and Footer insertion

## Screenshot

* Merge Combine the two websites into a PDF file
> π¦ See [Combine Code](https://github.com/pdsuwwz/puppeteer-server/blob/main/__test__/axios-node.js)


![image](https://user-images.githubusercontent.com/19891724/159743021-e1f9f528-d6d9-4d6b-b63f-4e71c6b72bdb.png)



## π― Prerequisites

Please make sure that [Node.js](https://nodejs.org/) (>= 10.18.1) is installed on your operating system.

## β¨ Features

* π Separation business logic and Controllers.

* π‘ Probably the best practice for Puppeteer project.

* π§© Configured routing.

* π§ Eslint configuration.

* β‘ Fast build with Rollup.

* π Extensible PDF watermark, header and footer.

* π§² Supports merging of multiple PDF files.

* π₯ HMR.

## Project structure

<pre>
βββ src
β   βββ controllers/ ---  Server controllers
β   βββ services/    ---  Server services
β   βββ config.ts    ---  About Environments variable
β   βββ main.ts      ---  Entry file
β   βββ routes.ts    ---  Configs for routing controllers <a href="#Routing">π Routing</a>
</pre>

## β‘ Quick Start

### 1. Installation

```bash
pnpm install
```

### 2. Running Development

```bash
pnpm dev
```

### 3. Running Production

The project has built-in a `pm2`, running the `pnpm start` will automatically manage the process by `pm2`.

Run `pnpm build` to build, then run `pnpm start` to start the process managed by `pm2`:

* Build

```bash
pnpm build
```

* Run

```bash
pnpm start
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

See [Merge Test](https://github.com/pdsuwwz/puppeteer-server/blob/main/__test__/axios-node.js)


## Routing

In order to make the routing information more readable and transparent, the form of configuration is adopted here.

You can create an `array` and then write the routing meta information into the `array`, and reuse it in the [src/routes.ts](https://github.com/pdsuwwz/puppeteer-server/blob/main/src/routes.ts)

```ts
const routes: Array<RouteConfig> = [
  {
    path: '/',
    method: 'get',
    action: homeController.hello
  },
  // here...
]
```

# License

:v:

[MIT](./LICENSE)


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpdsuwwz%2Fpuppeteer-server.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpdsuwwz%2Fpuppeteer-server?ref=badge_large)

