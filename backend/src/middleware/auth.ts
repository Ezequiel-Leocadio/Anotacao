import jwt from "jsonwebtoken";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  // await delay(80000);
  if (!authHeader || authHeader === undefined) {
    return res.json({
      success: false,
      message:
        "Erro de Autenticação, \n Faça login Novamente ou Atualize Sua Aplicação ! ",
    });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.KEY_TOKEN);

    req.user = {
      id: decoded.id,
      usuario: decoded.usuario,
      admin: decoded.admin,
      nome: decoded.nome,
      timeout: Number(req.headers.timeout || 0),
    };

    // console.log(`Acessando url: ${req.url}`);
    return next();
  } catch (err) {
    return res.json({
      success: false,
      message: `Erro de Autenticação, Token Invalid ! ${err}`,
    });
  }
};
