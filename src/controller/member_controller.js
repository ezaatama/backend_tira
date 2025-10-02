import memberService from "../services/member_service.js";

const create = async (req, res, next) => {
    try {
        const member = await memberService.createMember(req.body);
        res.status(201).json({
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
            messsage:"success get all members",
            data: members
        });
    } catch (error) {
        next(error);
    }
}

export default {
    create,
    getAll
}