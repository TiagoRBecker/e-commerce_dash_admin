import { mongooseConnect } from "../../../../server/mongose";
import { Category } from "../../../../models/Category";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
export default async function categories(req, res) {
  const { method } = req;
  const { id } = req.query;

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    res.status(401).json({
      message: "Não autorizado , necessário login para acessar esta rota!",
    });
    return;
  }
  try {
    await mongooseConnect();
    if (method === "DELETE") {
      if (id) {
        const deleteProduct = await Category.deleteOne({
          _id: id,
        });
        return res.json({
          deleteProduct,
        });
      }
    }
    if (method === "PUT") {
      const { name, properties, _id } = req.body;

      const updateCategory = await Category.updateOne(
        {
          _id: _id,
        },
        {
          name,
          properties,
        }
      );
      res.json({
        updateCategory,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Erro no servidor ! Tente novamente mais tarde.",
    });
  }
}
