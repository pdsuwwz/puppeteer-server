import {
  PDFDocument,
  PDFPage
} from 'pdf-lib'

/**
 * @example

curl --location --request GET \
'http://localhost:5000/simple-pdf?url=https://www.google.com/' \
--output test-simple-pdf.pdf

 */

export default class GenerateCombinePdfService {
  generate = async (...combineList: Promise<Uint8Array>[]): Promise<Buffer> => {
    const mergedPdf = await PDFDocument.create()

    const pdfsToMerge: Uint8Array[] = await Promise.all(combineList)

    for await (const pdfBytes of pdfsToMerge) {
      const pdf = await PDFDocument.load(pdfBytes)
      const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices())

      copiedPages.forEach((page: PDFPage) => {
        mergedPdf.addPage(page)
      })
    }

    const buffer = await mergedPdf.save()

    return Buffer.from(buffer)
  }
}
