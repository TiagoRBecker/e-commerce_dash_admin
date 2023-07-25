const stripe = require("stripe")(process.env.STRIPE_SK);
export default async function products(req, res) {
  try {
  const startDate = new Date();
  startDate.setDate(1);
  startDate.setHours(0, 0, 0, 0);

  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + 1, 0);
  endDate.setHours(23, 59, 59, 999);

  const charges = await stripe.charges.list({
    created: {
      gte: Math.floor(startDate.getTime() / 1000),
      lte: Math.floor(endDate.getTime() / 1000),
    },
  });
  let totalVendas = 0;
      for (const charge of charges.data) {
        totalVendas += charge.amount;
      }
    const total = totalVendas / 100
    
    res.status(200).json({ total});
  }
  catch(error){
    console.log(error)
    res.status(500).json({ error: 'Erro ao obter as vendas.' });

  }
  


}
