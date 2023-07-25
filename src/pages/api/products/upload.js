import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { unlink } from "fs/promises";

import nc from "next-connect";
const upload = multer({
  dest: "/tmp",
});

const handler = nc()
  .use(upload.array("file"))

  .post(async (req, res) => {
    
    const files = req.files;
    let link = [];
    for (const file of files) {
      const result = await cloudinary.uploader
        .upload(file.path, {
          public_id: `${Math.floor(Math.random() * 99999)}_e-comerce`,
          crop: "fill",
        })
        .catch((e) => console.log(e));

      link.push(result.url);
      // apaga o arquivo apos enviar para cloudnary
      await unlink(file.path);
    }
    
    return res.json({ link });
  });

export default handler;
export const config = {
  api: { bodyParser: false },
};
