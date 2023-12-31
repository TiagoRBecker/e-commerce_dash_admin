import { v2 as cloudinary } from "cloudinary";

import multiparty from "multiparty";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_API,
});
// rota de upload trata  os dados das imagem envia para cloudnary e me retorna apenas a url
export default async function handler(req, res) {
  try {
    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve({
          fields,
          files,
        });
      });
    });
  
    const link = [];
    for (const file of files.file) {
      const result = await cloudinary.uploader.upload(file.path, {
        public_id: `${Math.floor(Math.random() * 99999)}_e-comerce`,
        crop: "fill",
      });
      
      link.push(result.url);
    }
     
    return res.json({
      link,
    });
  } catch (error) {
    console.log(error)
    return res.status(500).json({message:"Error tente novamente mais tarde!"})
  }

}

export const config = {
  api: {
    bodyParser: false,
  },
};

/*

funçao upload em multer caso   não queria usar o multiparty
import multer from 'multer';
import path from 'path';
import {
  unlink
} from "fs";
import nc from "next-connect";
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "upload");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage
});
let uploadFile = upload.array("file")
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_API
});
const handler = nc()
  .use(uploadFile)

  .post(async (req, res) => {

    const files = req.files;
    let link = [];
    for (const file of files) {
      try {
        const result = await cloudinary.uploader
          .upload(file.path, {
            public_id: `${Math.floor(Math.random() * 99999)}_e-comerce`,
            crop: "fill",
          })
        link.push(result.url);
        
        await unlink(file.path)
      } catch (error) {
        console.log(error)
      }
    }
    console.log(link)
    return res.json({
      link
    });
  });

export default handler;
*/
