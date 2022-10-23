//import { getConnexion } from "../../../clients/aurora"

// import { AuroraConfig } from "../../../clients/aurora"
import { ClientAurora } from "../../../clients/aurora"



describe('Stack', () => { 

  it('test cnx', async () => {
    ClientAurora.getConnection().then((response:any) => {
      expect(response).toBe(2)
      console.log(response)
    })
   
  })


/*   it('instance signleton',  () => {
    
    expect(AuroraConfig.getInstance()._conf).toBe(2)
  })



  xit('test cnx',  () => {
    
    expect('./config').toBe(2)
  }) */

  
 })