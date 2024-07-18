import type { Context, Request } from 'koa'
import GeneratePdfService from '@/services/generate-pdf'

export type Cookies = {
  name: string
  value: string
  domain: string
}

export type Attachment = {
  header: string
  footer: string
}

/**
 * 生成 PDF 的请求参数
 */
export interface RequestBody extends Record<string, unknown> {
  /**
   * 目标网站
   *
   * Target site url
   */
  url?: string
  /**
   * 如果网站需要提前内置 sessionId cookie, 一般用作需要登录才能访问的网站，则添加此字段即可
   *
   * If the webpage needs to have a sessionId cookie built in advance,
   * which is generally used as a website that can only be accessed by logging in, add this field
   */
  cookies?: Array<Cookies>
  /**
   * 设置此字段为 true, 则生成出的 PDF 将含有内边距空白
   *
   * If this field is set to true, it means that the generated PDF will contain margins
   */
  hasMargin?: boolean
  /**
   * 是否生成横向 PDF
   *
   * Whether the generated PDF is horizontal
   */
  isLandscape?: boolean
  /**
   * 是否隐藏水印
   *
   * Whether to hide watermark
   */
  hiddenWatermark?: boolean
  /**
   * 展示自定义页眉页脚，前提是需要将 hasMargin 设置为 true
   *
   * Display the custom header and footer, provided that hasMargin is set to true
   */
  attachment?: Attachment
}

interface RequestPDF extends Request {
  body: RequestBody
}

interface ContextPDF extends Context {
  request: RequestPDF
}


class GeneratePdfController {
  private service: GeneratePdfService = new GeneratePdfService()

  generate = async (ctx: ContextPDF) => {
    const {
      url,
      cookies,
      hasMargin
    } = ctx.request.body


    if (!url) {
      ctx.status = 404
      ctx.body = {
        status: 'NOT-FOUND'
      }
      return
    }


    const pdf = await this.service.generate({
      url,
      cookies,
      hasMargin
    })

    if (Object.prototype.toString.call(pdf) === '[object Uint8Array]') {
      ctx.type = 'application/pdf'
    }
    ctx.body = pdf
  }
}

export default new GeneratePdfController()
