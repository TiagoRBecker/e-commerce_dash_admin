const stripe = require("stripe")(process.env.STRIPE_SK);
export default async function products(req, res) {
  
    try {
      const charges = await stripe.charges.list();
      let totalSales = 0;
      
      charges.data.forEach(charge => {
        if (charge.paid) {
          totalSales += charge.amount;
        }
      });
      const total = totalSales / 100

      
      res.status(200).json({total})
      
    } catch (error) {
      console.log(error)
      res.status(500).json({error:'Erro ao recuperar o total vendido'})
    
    }
  
}
