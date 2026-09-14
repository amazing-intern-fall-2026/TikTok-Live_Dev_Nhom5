import { Router } from "express";
import { connectTiktok, disconnectTiktok } from "../controllers/tiktokController.ts"

const router = Router();

router.post("/connect/:id", connectTiktok);
router.post("/disconnect/:id", disconnectTiktok);

export default router;
