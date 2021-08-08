
/**
 * @example

curl --location --request GET \
'http://localhost:5000/simple-pdf?url=https://www.google.com/' \
--output test-simple-pdf.pdf

 */

export default class GenerateCombinePdfService {
  // generate = async (p1:any, p2:any): Promise<unknown> => {
  //   // console.log(combineList)

  //   // const { url } = combineList

  //   return {}
  // }
  generate = async (...combineList: Promise<unknown>[]): Promise<unknown> => {
    console.log('combineList', combineList)

    // const { url } = combineList

    return {}
  }
}
