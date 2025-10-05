import memberService from "../services/member_service.js";

const create = async (req, res, next) => {
    try {
        const member = await memberService.createMember(req.body);
        res.status(201).json({
            success: true,
            messsage:"success create member",
            data: member
        });
    } catch (error) {
        next(error);
    }
}

const getAll = async (req, res, next) => {
    try {
        const members = await memberService.getAllMember();
        res.status(200).json({
            success: true,
            messsage:"success get all members",
            data: members
        });
    } catch (error) {
        next(error);
    }
}

const getById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await memberService.getMemberById(id);

        res.status(200).json({
            success: true,
            message: "Success get member by id",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

const updateMember = async (req, res, next) => {
    try {
        const request = {
            m_rep_id: req.params.id,
            ...req.body
        }

        const result = await memberService.updateMember(request);

        res.status(200).json({
            success: true,
            message: "Member updated successfully",
            data: result
        });

    } catch (error) {
        next(error);
    }
}

const deleteMember = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await memberService.deleteMember(id);

        res.status(200).json({
            success: true,
            message: "Member delete successfully",
            data: result
        });
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    getAll,
    getById,
    updateMember,
    deleteMember
}