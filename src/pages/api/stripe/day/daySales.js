const stripe = require("stripe")(process.env.STRIPE_SK);
export default async function handler(req, res) {
try {
    const today = new Date();
    const day =
      new Date(
        today.getFullYear(),
        today.getMonth(),
        today.getDate(),
        0,
        0,
        0,
        0
      ).getTime() / 1000;
    const charges = await stripe.charges.list({
      limit: 100,
      created: {
        gte: day,
      },
    });
    let totalVendas = 0;
    for (const charge of charges.data) {
      totalVendas += charge.amount;
    }
    const total = totalVendas / 100;

    res.status(200).json({ total });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Erro ao recuperar o total vendido no dia !" });
  }
  
}
