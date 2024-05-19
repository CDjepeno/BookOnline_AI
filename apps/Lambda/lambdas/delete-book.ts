export const config = {
  routes: ["DELETE /book"],
  props: {
    name: "delete-book",
    rdsAccess: true,
    description: "delete Book",
  },
};


async function handler(event:any, context: any) {
  console.log('Got an event')
  console.log(event)
  return {
    statusCode: 200,
    body: 'Hello from lambda deleteBook'
  }
}

export { handler }


