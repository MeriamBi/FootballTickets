import multer, { diskStorage } from "multer";
import path, { join, dirname, extname } from "path";
import { fileURLToPath } from "url";

export default function (image) {
    return multer({
        storage: diskStorage({
            destination: (req, file, callback) => {
                const __dirname = dirname(fileURLToPath(import.meta.url));
                callback(null, join(__dirname, "../public/images"));
            },
            filename: (req, file, callback) => {
                const name = path.parse(file.originalname.split(" ").join("_")).name
                const extension = extname(file.originalname);
                callback(null, name + Date.now() + extension);
            },
        }),
        limits: 10 * 1024 * 1024,
    }).single(image);
}