import { Router } from "express";
import multer from "multer";

import authMiddleware from "./middleware/auth";

import { UsuarioController } from "./controllers/UsuarioController";
import { NotasController } from "./controllers/NotasController";
import { ListasController } from "./controllers/ListasController";
import { SincronizarController } from "./controllers/SincronizarController";
import uploadConfig from "./config/upload";

const router = Router();
const upload = multer(uploadConfig);

const usuarioController = new UsuarioController();
const notasController = new NotasController();
const listasController = new ListasController();
const sincronizarController = new SincronizarController();

router.post("/login", usuarioController.login);

router.use(authMiddleware);

//Usuarios
router.post("/usuario", usuarioController.inserir);
router.put("/usuario", usuarioController.editar);
router.put("/usuarioedit", usuarioController.editarUser);
router.put("/usuarioeditsenha", usuarioController.editarSenha);
router.get("/usuario", usuarioController.find);
router.get("/usuarios", usuarioController.listar);
router.get("/usuariosall", usuarioController.listarAll);

// Notas
router.get("/notas", notasController.listar);
router.get("/nota", notasController.find);
router.post("/notas", notasController.inserir);
router.put("/notas", notasController.editar);

// Lista
router.get("/listas", listasController.listar);
router.get("/lista", listasController.find);
router.post("/listas", listasController.inserir);
router.put("/listas", listasController.editar);

router.post("/sincronizar", sincronizarController.inserir);
router.post(
  "/sincronizarimage",
  upload.single("file"),
  sincronizarController.inserirImage
);
router.get("/sincronizar", sincronizarController.listar);

export { router };
