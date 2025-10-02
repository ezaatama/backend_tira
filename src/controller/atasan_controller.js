import atasanService from "../services/atasan_service.js";

const create = async (req, res, next) => {
    try {
        const atasan = await atasanService.create(req.body);
        res.status(201).json({
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
            messsage:"success get all atasan",
            data: atasanList
        });
    } catch (error) {
        next(error);
    }
}

const deleteAtasan = async (req, res, next) => { 
    try {
        const { m_rep_id } = req.params;
        await atasanService.deleteAtasan(m_rep_id);
        res.status(200).json({
            message: `Atasan dengan id ${m_rep_id} berhasil dihapus`
        });
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    getAll,
    deleteAtasan
}