import { Router } from "express";

const router = Router();

router.route("/").post()
router.route("/").get()
router.route("/:id").get()
router.route("/:id/status").patch()

export default router;