import resellerService from "../services/data_reseller_service.js";

const getDataSales = async (req, res, next) => {
    try {
        const dataSales = await resellerService.getDataSales();
        const formattedData = dataSales.map(sales => {
            const atasan = sales.atasan

            let gepd;
            if (atasan.m_current_position === 'GEPD') {
                gepd = atasan;
            } else if (atasan.manager) {
                gepd = atasan.manager;
            } else {
                gepd = atasan;
            }

            return {
                m_mst_gepd: gepd.m_rep_id,
                NamaGEPD: gepd.m_name,
                m_mst_epd: atasan.m_rep_id,
                NamaEPD: atasan.m_name,
                m_branch_id: sales.m_branch_id,
                m_name: sales.m_name
            }
        });

        res.status(200).json({
            success: true,
            messsage:"success get data sales",
            data: formattedData
        });
        
    } catch (error) {
        next(error);
    }
}

export default {
    getDataSales
}