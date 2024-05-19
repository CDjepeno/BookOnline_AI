
  export const config = {
    routes: ["GET /books"],
    props: {
      name: "get-books",
      rdsAccess: true,
      description: "get Books",
    },
  };
  
async function handler(event:any, context: any) {
  console.log('Got an event')
  console.log(event)
  return {
    statusCode: 200,
    body: 'Hello from lambda getBookss'
  }
}

export { handler }