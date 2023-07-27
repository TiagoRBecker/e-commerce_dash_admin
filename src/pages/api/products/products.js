
import { Product } from "../../../../models/Product";
import { mongooseConnect } from "../../../../server/mongose";
import { getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]";
export default async function products(req, res) {
  const { method } = req;
  const { name, price, brand, descript, images, category, properties } = req.body;
  const { search } = req.query;
  // caso o priço venha como string transforma em number devido ao uso do fw numberformat
  let replacePrice = parseInt(price?.replace(/\D/g, ""))
  const page = req.query.pg || 0;
  const limit = 7;

 //  pega asessao via next auth caso nao tenha sessao manda para rota login
  const session = await getServerSession(req, res, authOptions)

  if (!session) {
    res.status(401).json({ message: "Não autorizado , necessário login para acessar esta rota!" });
    return;
  }
  // verfica se existe session para poder acessar as rotas da api
 try {
  await mongooseConnect();
  //method GET
  if (method === "GET") {
    if (search) {
      const getProducts = await Product.find({
        $or: [
          { name: { $regex: search || "", $options: "i" } },
          { brand: { $regex: search || "", $options: "i" } },
        ],
      });
      return res.json({ getProducts });
    } else {
      const getProducts = await Product.find()
        .skip(page * limit)
        .limit(limit);
      return res.json({ getProducts });
    }
  }
  //metodh Post
  if (method === "POST") {
    
    const createProducts = await Product.create({
      name,
      price: replacePrice,
      brand,
      descript,
      img:images,
      category,
      properties,
    });
    return res.json({ createProducts });
  } else {
    return res.status(404).json({ msg: "Erro ao criar o produto" });
  }
 } catch (error) {
  console.log(error)
  return res.status(500).json({message:"Erro no servidor tente novamenete mais tarde!"})
 }
  
 
  
}

