export default class HomeService {
  hello = (): Promise<unknown> => {
    return new Promise(resolve => resolve({
      say: {
        hello: 'Hello, Puppeteer Server',
        date: new Date()
      }
    }))
  }
}
