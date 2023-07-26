import { getServerSession } from "next-auth";
import { Product } from "../../../../models/Product";
import { mongooseConnect } from "../../../../server/mongose";
import  { authOptions } from "../auth/[...nextauth]";

export default async function products(req, res) {
  const { method } = req;
  const { id } = req.query;
  const { name, price, brand, descript, images, category, properties } = req.body;

  let priceReplace;

if (typeof price === "string") {
  priceReplace = price.replace(/\D/g, "");
} else {
  priceReplace = price;
}

 
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    res.status(401).json({ message: "Não autorizado , necessário login para acessar esta rota!" });
    return;
  }
 try {
  await mongooseConnect();


  if (method === "POST") {
   
    if (id) {
      try {
        const editProduct = await Product.updateOne(
          {
            _id: id,
          },
          {
            name,
            price: priceReplace,
            brand,
            descript,
            img:images,
            category,
            properties,
          }
        );
        return res.json({
          editProduct,
        });
      } catch (error) {
          console.log(error)
      }
    
    }
  }
  if (method === "DELETE") {
    
    if (id) {
      try {
        const deleteProduct = await Product.deleteOne({
          _id: id,
        });
        return res.json({
          deleteProduct,
        });
      } catch (error) {
         console.log(error)
      }
     
    }
  }
 } catch (error) {
  return res.status(500).json({
    error: "Erro no servidor tente novamente mais tarde",
  });
  
 }
 
 
  
 

  
}
