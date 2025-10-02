import { prismaClient } from "../application/database.js";

const getDataSales = async () => {
    return await prismaClient.member.findMany({
        include: {
            atasan: {
                include: {
                    manager: {
                        select: {
                            m_rep_id: true,
                            m_name: true,
                            m_current_position: true,
                        }
                    }
                }
            }
        },
        orderBy: [
            {
                atasan: {
                    manager: {
                        m_rep_id: 'asc'
                    }
                }
            },
            {
                atasan: {
                    m_rep_id: 'asc'
                }
            },
            {
                m_branch_id: 'asc'
            }
        ]
    });
}

export default {
    getDataSales
}