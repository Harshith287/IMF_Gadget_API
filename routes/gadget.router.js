import { Router } from "express";
import { getGadgets,createGadget,updateGadget,deleteGadget,getGadget, selfDestructGadget } from "../controllers/gadget.controller.js";
import { authorize } from "../middleware/auth.middleware.js";
const gadgetRouter = Router();

gadgetRouter.get('/',authorize,getGadgets);
gadgetRouter.post('/',authorize,createGadget);
gadgetRouter.patch('/:id',authorize,updateGadget);
gadgetRouter.delete('/:id',authorize,deleteGadget);
gadgetRouter.get('/:id',authorize,getGadget);
gadgetRouter.post('/:id/self-destruct',authorize,selfDestructGadget);

export default gadgetRouter;