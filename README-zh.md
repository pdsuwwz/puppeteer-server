# Puppeteer Server
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpdsuwwz%2Fpuppeteer-server.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpdsuwwz%2Fpuppeteer-server?ref=badge_shield)

ä¸­æ | [English](README.md)

## ä»ç»

> ð¦© Koa + TypeScript + Rollup + Puppeteer

* è½å¤å°ä»»æç½é¡µå¿«éçæä¸º PDFãå¾çã

* æ¯æå°å¤ä¸ªç½é¡µåå¹¶ï¼å¹¶æç»çæä¸ä¸ª PDF æä»¶ï¼æ¯æ Cookie çæ³¨å¥ãPDF æ°´å°çæ·»å åé¡µçé¡µèçæå¥ã

## æªå¾

* ç¤ºä¾ï¼åå¹¶ä¸¤ä¸ªç½ç«å°ä¸ä¸ª PDF æä»¶
> ð¦ è§ä»£ç  [Combine Code](https://github.com/pdsuwwz/puppeteer-server/blob/main/__test__/axios-node.js)


![image](https://user-images.githubusercontent.com/19891724/159743021-e1f9f528-d6d9-4d6b-b63f-4e71c6b72bdb.png)



## ð¯ ååºåå¤

è¯·ç¡®ä¿å®è£äº [Node.js](https://nodejs.org/)(>= 10.18.1)

## â¨ ç¹æ§

* ð è§£è¦äºä¸å¡å±åæ§å¶å±

* ð¡ å¯è½æ¯ Puppeteer é¡¹ç®çæä½³å®è·µ

* ð§© å¯éç½®çè·¯ç±

* ð§ åç½® Eslint è¯­æ³é£æ ¼æ£æ¥

* â¡ ä½¿ç¨ Rollup å¿«éæå»º

* ð åç½®äº PDF æ°´å°ãé¡µçåé¡µèï¼å¯èªè¡ä¿®æ¹åæ©å±

* ð§² æ¯æåå¹¶å¤ä¸ª PDF æä»¶

* ð¥ æ¯æå¼åç¯å¢ä¸çæ¨¡åç­æ´æ°

## é¡¹ç®ç»æ

<pre>
âââ src
â   âââ controllers/ ---  æ§å¶å±ï¼è´è´£è°ç¨ä¸å¡å±çæ¥å£
â   âââ services/    ---  ä¸å¡å±ï¼è´è´£ç¼åå·ä½çä¸å¡ä»£ç 
â   âââ config.ts    ---  ç¨äºå¯¼åºä¸äºå¨å±åé
â   âââ main.ts      ---  å¥å£æä»¶
â   âââ routes.ts    ---  ç¨äºéç½®è·¯ç±åä¿¡æ¯ <a href="#è·¯ç±éç½®">ð è·¯ç±éç½®</a>
</pre>

## â¡ å¿«éå¼å§

### 1. å®è£

```bash
pnpm install
```

### 2. å¼åç¯å¢è¿è¡

```bash
pnpm dev
```

### 3. çäº§ç¯å¢è¿è¡

è¯¥é¡¹ç®å·²åç½® `pm2`ï¼å¨æå»ºå®æ¯åè¿è¡ `pnpm start` å³å¯ä½¿ç¨ `pm2` ç®¡çè¿ç¨ã

è¿è¡ `pnpm build` è¿è¡æå»ºï¼ç¶åè¿è¡ `pnpm start` å¯å¨ç± `pm2` ç®¡ççè¿ç¨:

* æåæå»º

```bash
pnpm build
```

* è¿è¡

```bash
pnpm start
```

## æ ¸å¿æ¥å£

* `GET /image`

ç¨äºçæä¸å¼ å¾ç

```bash
curl --location --request GET \
'http://localhost:5000/image?url=https://www.baidu.com' \
--output test-image.png
```

* `GET /simple-pdf`

ç¨äºçæä¸ä¸ª PDF æä»¶

```bash
curl --location --request GET \
'http://localhost:5000/simple-pdf?url=https://www.google.com/' \
--output test-simple-pdf.pdf
```

* `POST /pdf`

å¯çæä¸ä¸ªå¸¦æèªå®ä¹é¡µçåé¡µèç PDFï¼é¡µçé¡µèçåå®¹å¯éè¿åæ°æ¥æ§å¶æ¯å¦æ¾ç¤ºï¼

```bash
curl --location --request POST 'http://localhost:5000/pdf' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'url=http://www.google.com' \
--data-urlencode 'cookies[0].name=token' \
--data-urlencode 'cookies[0].value=9s2d4c16-f072-16eg-b134-0642ap190006' \
--data-urlencode 'cookies[0].domain=www.google.com' --output test-complex-pdf.pdf
```

* `POST /combine-pdf`

ç¨äºå°å¤ä¸ª PDF æä»¶åå¹¶å°ä¸ä¸ªæä»¶

æ¥ç [ç¤ºä¾ä»£ç ](https://github.com/pdsuwwz/puppeteer-server/blob/main/__test__/axios-node.js)


## è·¯ç±éç½®

ä¸ºäºä½¿è·¯ç±åæ°æ®æ´å·å¯è¯»æ§åéææ§ï¼è¿ééç¨äºéç½®åçæ¹å¼

ä½ å¯ä»¥åå»ºä¸ä¸ª `æ°ç»`ï¼ç¶åå°è·¯ç±åä¿¡æ¯åå¥è¯¥ `æ°ç»` ä¸­ï¼å¹¶å¨ [src/routes.ts](https://github.com/pdsuwwz/puppeteer-server/blob/main/src/routes.ts) ä¸­éç¨å®

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

# è®¸å¯è¯

:v:

[MIT](./LICENSE)


[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpdsuwwz%2Fpuppeteer-server.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpdsuwwz%2Fpuppeteer-server?ref=badge_large)

