import Order from "../../../../models/Order";
import { mongooseConnect } from "../../../../server/mongose";
import Nextauth from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
export default async function handler(req, res) {
   await mongooseConnect()
   const session = await getServerSession(req, res, Nextauth)

   if (!session) {
     res.status(401).json({ message: "Não autorizado , necessário login para acessar esta rota!" });
     return;
   }
   const orders = await Order.find({},null,{sort: {'_id':-1}, limit:5})
    return res.json({ orders})
    
}