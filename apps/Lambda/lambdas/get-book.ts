export const config = {
  routes: ["GET /book"],
  props: {
    name: "get-book",
    rdsAccess: true,
    description: "get Book",
  },
};


async function handler(event:any, context: any) {
  console.log('Got an event')
  console.log(event)
  return {
    statusCode: 200,
    body: 'Hello from lambda getBook'
  }
}

export { handler }