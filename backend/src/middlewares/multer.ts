import multer from "multer";
import path from "path";

export const upload = multer({
  storage: multer.diskStorage({
    destination: "/tmp", 
    filename: (req, file, callback) => {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
      callback(null, name);
    },
  }),
});
