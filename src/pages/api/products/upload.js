import {
  v2 as cloudinary
} from "cloudinary";


import multiparty from 'multiparty';



export default async function handler(req,res) {
 


  const form = new multiparty.Form();
  const {fields,files} = await new Promise((resolve,reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({fields,files});
    });
  });

 
  const link = [];
  for (const file of files.file) {
 
    const result = await cloudinary.uploader
          .upload(file.path, {
            public_id: `${Math.floor(Math.random() * 99999)}_e-comerce`,
            crop: "fill",
          })
  
    
    link.push(result.url);
  }
  return res.json({link});
}

export const config = {
  api: {
    bodyParser: false
  },
};

/*
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