import { prismaClient } from "../application/database.js";
import {validate} from "../validation/validation.js";
import { createValidation } from "../validation/atasan_validation.js";
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
            managed_atasan: true,
            managed_member: true,
            manager: true,
        }
    });
}

const deleteAtasan = async (m_rep_id) => {
    const existing = await prismaClient.atasan.findUnique({
        where: { m_rep_id }
    });

    if (!existing) {
        throw new ResponseError(404, `Atasan dengan id ${m_rep_id} tidak ditemukan`);
    }

    return prismaClient.atasan.delete({
        where: {m_rep_id}
    })
}


export default {
    create,
    getAllAtasan,
    deleteAtasan
}