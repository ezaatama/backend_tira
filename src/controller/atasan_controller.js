import atasanService from "../services/atasan_service.js";

const create = async (req, res, next) => {
    try {
        const atasan = await atasanService.create(req.body);
        res.status(201).json({
            success: true,
            messsage:"success create atasan",
            data: atasan
        });
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const atasanList = await atasanService.getAllAtasan();
        res.status(200).json({
            success: true,
            messsage:"success get all atasan",
            data: atasanList
        });
    } catch (error) {
        next(error);
    }
}

const getGEPD = async (req, res, next) => {
    try {
        const gepdList = await atasanService.getAtasanGEPD();
        res.status(200).json({
            success: true,
            messsage:"success get atasan GEPD",
            data: gepdList
        });
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const{id} = req.params;
        const result = await atasanService.getAtasanById(id);

        res.status(200).json({
            success: true,
            message: "Success get atasan by id",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const updateAtasan = async (req, res, next) => {
    try {
        const request = {
            m_rep_id: req.params.id,
            ...req.body,
        }

        const result = await atasanService.updateAtasan(request);

        res.status(200).json({
            success: true,
            message: "Atasan updated successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
}

const deleteAtasan = async (req, res, next) => { 
    try {
        const {id} = req.params;
        const result = await atasanService.deleteAtasan(id);
        res.status(200).json({
            success: true,
            message: `Atasan dengan id ${id} berhasil dihapus`,
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    getAll,
    getGEPD,
    getById,
    updateAtasan,
    deleteAtasan
}