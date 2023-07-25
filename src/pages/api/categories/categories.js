import {
  getServerSession
} from "next-auth/next"
import {
  Category
} from "../../../../models/Category"
import {
  mongooseConnect
} from "../../../../server/mongose"
import {
  authOptions
} from "../auth/[...nextauth]"

export default async function categories(req, res) {
  const {
    method
  } = req
  const session = await getServerSession(req, res, authOptions)


  if (!session) {
    res.status(401).json({
      message: "You must be logged in."
    });
    return;
  }

  try {
    await mongooseConnect()
   if(method === "GET"){
    const getCategory = await Category.find()
    return res.status(200).json({getCategory})
   }

    if (method === "POST") {

      const {
        name,
        properties
      } = req.body;


      const createCategory = await Category.create({
        name,
        properties,
      })
      return res.json({
        createCategory
      })

    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Erro no servidor ! Tente novamente mais tarde."
    })
  }



}