import multer from "multer";
import crypto from "crypto";
import { extname, resolve } from "path";

function multerfunc() {
  try {
    return {
      storage: new multer.diskStorage({
        destination: resolve(__dirname, "..", "..", "upload"),
        filename: (req, file, cb) => {
          crypto.randomBytes(16, (err, res) => {
            if (err) return cb(err);

            return cb(null, res.toString("hex") + extname(file.originalname));
          });
        },
      }),
    };
  } catch (error) {
    console.log(`${error}`);
    return { store: null };
  }
}
export default multerfunc();
