export default function createResponse (statusCode:number, body:any) {
    return{
        statusCode,
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        body:JSON.stringify(body),
      }
}