import { prismaClient } from "../application/database.js";
import {validate} from "../validation/validation.js";
import { atasanIdValidation, createValidation, updateValidation } from "../validation/atasan_validation.js";
import {ResponseError} from "../error/response_error.js";

const create = async (request) => {
    const createRequest = validate(createValidation, request);

    let managerId = createRequest.m_manager_id;

    if (!managerId) {
        managerId = createRequest.m_rep_id;
    } else {
        // cek apakah manager yang dituju ada
        const manager = await prismaClient.atasan.findUnique({
        where: { m_rep_id: managerId }
        });

        if (!manager) {
            throw new ResponseError(400, `Manager dengan id ${managerId} tidak ditemukan`);
        }
    }

    const existing = await prismaClient.atasan.findUnique({
        where: { m_rep_id: createRequest.m_rep_id }
    });

    if (existing) {
        return prismaClient.atasan.update({
        where: { m_rep_id: createRequest.m_rep_id },
        data: {
            ...createRequest,
            m_manager_id: managerId,
        },
        select: {
            m_rep_id: true,
            m_branch_id: true,
            m_name: true,
            m_current_position: true,
            m_manager_id: true,
        },
        });
    } else {
        return prismaClient.atasan.create({
            data: {
                ...createRequest,
                m_manager_id: managerId,
            },
            select: {
                m_rep_id: true,
                m_branch_id: true,
                m_name: true,
                m_current_position: true,
                m_manager_id: true,
            },
        });
    }
}

const getAllAtasan = async () => {
    return await prismaClient.atasan.findMany({
        include: {
            managed_atasan: {
                where: {
                    m_current_position: { not: "GEPD" }
                }
            },
            managed_member: true,
            manager: true,
        }
    });
}

const getAtasanGEPD = async () => {
    return await prismaClient.atasan.findMany({
        where: {
            m_current_position: "GEPD"
        },
        include: {
            managed_atasan: {
                where: {
                    m_current_position: { not: "GEPD" }
                }
            },
            managed_member: true,
            manager: true,
        }
    });
}

const getAtasanById = async (atasanId) => {
    atasanId = validate(atasanIdValidation, atasanId);

    const atasan = await prismaClient.atasan.findUnique({
        where: {
            m_rep_id: atasanId
        },
        include: {
            managed_atasan: {
                where: {
                    m_current_position: { not: "GEPD" }
                }
            },
            managed_member: true,
            manager: true,
        }
    });

    if (!atasan) {
        throw new ResponseError(404, `Atasan dengan id ${atasanId} tidak ditemukan`);
    }

    return atasan;
}

const updateAtasan = async (request) => {
    const atasanId = validate(atasanIdValidation, request.m_rep_id);
    const { m_rep_id, ...updateData } = request;

    const atasanRequest = validate(updateValidation, updateData);

    const existingAtasan = await prismaClient.atasan.findUnique({
        where: {
            m_rep_id: atasanId
        }
    });

    if(!existingAtasan) {
        throw new ResponseError(404, `Atasan dengan id ${atasanId} tidak ditemukan`);
    }

    if(atasanRequest.m_manager_id) {
        const atasan = await prismaClient.atasan.findUnique({
            where: {
                m_rep_id: atasanRequest.m_manager_id
            }
        });

        if(!atasan) {
            throw new ResponseError(404, `Atasan dengan id ${atasanRequest.m_manager_id} tidak ditemukan`);
        }
    }

    return prismaClient.atasan.update({
        where: {
            m_rep_id: atasanId
        },
        data: atasanRequest,
        select: {
            m_rep_id: true,
            m_branch_id: true,
            m_name: true,
            m_current_position: true,
            m_manager_id: true
        }
    });
}

const deleteAtasan = async (atasanId) => {
    
    atasanId = validate(atasanIdValidation, atasanId);

    const existingAtasan = await prismaClient.atasan.findUnique({
        where: {
            m_rep_id: atasanId
        },
        include: {
            managed_member: true,
            managed_atasan: {
                where: {
                    m_current_position: { not: "GEPD" }
                }
            },
        }
    });


    if(!existingAtasan) {
            throw new ResponseError(404, `Atasan dengan id ${atasanId} tidak ditemukan`);
    }

    if(existingAtasan.managed_member.length > 0) {
        throw new ResponseError(400, `Tidak dapat menghapus atasan yang masih memiliki member. Harap pindahkan ${existingAtasan.managed_member.length} member terlebih dahulu.`);
    }

    if (existingAtasan.managed_atasan.length > 0) {
        throw new ResponseError(400, `Tidak dapat menghapus atasan yang masih memiliki atasan bawahan. Harap pindahkan ${existingAtasan.managed_atasan.length} atasan terlebih dahulu.`);
    }


    return prismaClient.atasan.delete({
        where: { m_rep_id: atasanId },
        select: {
            m_rep_id: true,
            m_name: true
        }
    });
    
}


export default {
    create,
    getAllAtasan,
    getAtasanGEPD,
    getAtasanById,
    updateAtasan,
    deleteAtasan
}