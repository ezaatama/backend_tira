import {validate} from '../validation/validation.js';
import { createValidation } from '../validation/atasan_validation.js';
import { ResponseError } from '../error/response_error.js';
import { prismaClient } from '../application/database.js';
import { memberIdValidation, updateValidation } from '../validation/member_validation.js';

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

const getMemberById = async (memberId) => {
    memberId = validate(memberIdValidation, memberId);

    const member = await prismaClient.member.findUnique({
        where: {
            m_rep_id: memberId
        },
        include: {
            atasan: {
                select: {
                    m_rep_id: true,
                    m_name: true,
                    m_branch_id: true,
                    m_current_position: true,
                    manager: {
                        select: {
                            m_rep_id: true,
                            m_name: true,
                            m_current_position: true
                        }
                    }
                }
            }
        }
    });

    if (!member) {
        throw new ResponseError(404, `Member dengan id ${memberId} tidak ditemukan`);
    }

    return member;
}

const updateMember = async (request) => {
    const memberId = validate(memberIdValidation, request.m_rep_id);
    const updateRequest = validate(updateValidation, request);

    const existingMembers = await prismaClient.member.findUnique({
        where: {
            m_rep_id: memberId
        }
    });

    if (!existingMembers) {
        throw new ResponseError(404, `Member dengan id ${memberId} tidak ditemukan`);
    }

    if (updateRequest.m_manager_id) {
        const atasan = await prismaClient.atasan.findUnique({
            where: {
                m_rep_id: updateRequest.m_manager_id
            }
        });

        if (!atasan) {
            throw new ResponseError(404, `Atasan dengan id ${updateRequest.m_manager_id} tidak ditemukan`);
        }
    }

    return prismaClient.member.update({
        where: {
            m_rep_id: memberId
        },
        data: updateRequest,
        select: {
            m_rep_id: true,
            m_branch_id: true,
            m_name: true,
            m_current_position: true,
            m_manager_id: true
        }
    })
}

const deleteMember = async (memberId) => {
    memberId = validate(memberIdValidation, memberId);

    const existingMembers = await prismaClient.member.findUnique({
        where: {
            m_rep_id: memberId
        }
    });

    if (!existingMember) {
        throw new ResponseError(404, `Member dengan id ${memberId} tidak ditemukan`);
    }

    return prismaClient.member.delete({
        where: {
            m_rep_id: memberId
        },
        select: {
            m_rep_id: true,
            m_name: true,
            m_branch_id: true
        }
    });
}

export default {
    createMember,
    getAllMember,
    getMemberById,
    updateMember,
    deleteMember
}