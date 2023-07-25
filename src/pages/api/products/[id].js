import { getServerSession } from "next-auth";
import { Product } from "../../../../models/Product";
import { mongooseConnect } from "../../../../server/mongose";
import  { authOptions } from "../auth/[...nextauth]";

export default async function products(req, res) {
  const { method } = req;
  const { id } = req.query;
  const { name, price, brand, descript, img, category, properties } = req.body;
  
 
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "Não autorizado , necessário login para acessar esta rota!" });
    return;
  }
 try {
  await mongooseConnect();


  if (method === "POST") {
   
    if (id) {
      const editProduct = await Product.updateOne(
        {
          _id: id,
        },
        {
          name,
          price,
          brand,
          descript,
          img,
          category,
          properties,
        }
      );
      return res.json({
        editProduct,
      });
    }
  }
  if (method === "DELETE") {
    
    if (id) {
      const deleteProduct = await Product.deleteOne({
        _id: id,
      });
      return res.json({
        deleteProduct,
      });
    }
  }
 } catch (error) {
  return res.status(500).json({
    error: "Erro no servidor tente novamente mais tarde",
  });
 }
  
 

  
}
