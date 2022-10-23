import { ClientAurora } from "../../../clients/aurora"


describe('Stack', () => { 

  it('test cnx', async () => {
    ClientAurora.getConnection().then((response:any) => {
      expect(response).toBe(2)
      console.log(response)
    })
  })
  
 })