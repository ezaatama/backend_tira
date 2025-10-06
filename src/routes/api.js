import express from "express";
import atasanController from "../controller/atasan_controller.js"; 
import memberController from "../controller/member_controller.js";
import salesController from "../controller/data_reseller_controller.js";
import dokumenController from "../controller/dokumen_controller.js";
import { authMiddleware, adminMiddleware } from "../middleware/auth_middleware.js";

const routers = new express.Router();

//atasan routes
routers.post('/api/atasan', authMiddleware, adminMiddleware, atasanController.create);
routers.get('/api/atasan', authMiddleware, adminMiddleware, atasanController.getAll);
routers.get('/api/atasan-gepd', authMiddleware, adminMiddleware, atasanController.getGEPD);
routers.get('/api/atasan/:id', authMiddleware, adminMiddleware, atasanController.getById);
routers.put('/api/atasan/:id', authMiddleware, adminMiddleware, atasanController.updateAtasan);
routers.delete('/api/atasan/:id', authMiddleware, adminMiddleware, atasanController.deleteAtasan);

//member routes
routers.post('/api/member', authMiddleware, adminMiddleware, memberController.create);
routers.get('/api/member', authMiddleware, adminMiddleware, memberController.getAll);
routers.get('/api/member/:id', authMiddleware, adminMiddleware, memberController.getById);
routers.put('/api/member/:id', authMiddleware, adminMiddleware, memberController.updateMember);
routers.delete('/api/member/:id', authMiddleware, adminMiddleware, memberController.deleteMember);

//sales routes
routers.get('/api/sales', authMiddleware, salesController.getDataSales);

//export excel
routers.get('/api/export/sales/excel', authMiddleware, adminMiddleware, dokumenController.downloadDataExcel);
routers.get('/api/export/sales/preview', authMiddleware, adminMiddleware, dokumenController.previewSalesData);

export {
    routers
}