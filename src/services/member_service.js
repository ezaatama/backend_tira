import {validate} from '../validation/validation.js';
import { createValidation } from '../validation/atasan_validation.js';
import { ResponseError } from '../error/response_error.js';
import { prismaClient } from '../application/database.js';

const createMember = async (request) => {
    const createRequest = validate(createValidation, request);

    const atasan = await prismaClient.atasan.findUnique({
        where: {
            m_rep_id: createRequest.m_manager_id
        }
    });

    if (!atasan) {
        throw new ResponseError(404, `Atasan dengan id ${createRequest.m_manager_id} tidak ditemukan`);
    }

    const managerId = createRequest.m_manager_id;

    return prismaClient.member.create({
        data: {
            ...createRequest,
            m_manager_id: managerId
        },
        select: {
            m_rep_id: true,
            m_branch_id: true,
            m_name: true,
            m_current_position: true,
            m_manager_id: true,
        },
    })
}

const getAllMember = async () => {
    return prismaClient.member.findMany({
        include: {
            atasan: true
        }
    })
}

export default {
    createMember,
    getAllMember
}