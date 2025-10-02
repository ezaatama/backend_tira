import express from "express";
import atasanController from "../controller/atasan_controller.js"; 
import memberController from "../controller/member_controller.js";
import salesController from "../controller/data_reseller_controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth_middleware.js";

const routers = new express.Router();

//atasan routes
routers.post('/api/atasan', authMiddleware, adminMiddleware, atasanController.create);
routers.get('/api/atasan', authMiddleware, adminMiddleware, atasanController.getAll);
routers.delete('/api/atasan/:m_rep_id', authMiddleware, adminMiddleware, atasanController.deleteAtasan);

//member routes
routers.post('/api/member', authMiddleware, adminMiddleware, memberController.create);
routers.get('/api/member', authMiddleware, adminMiddleware, memberController.getAll);

//sales routes
routers.get('/api/sales', authMiddleware, adminMiddleware, salesController.getDataSales);

export {
    routers
}