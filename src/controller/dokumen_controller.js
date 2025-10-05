import excelExportService from '../services/excel_export.js';
import resellerService from '../services/data_reseller_service.js';
import { ResponseError } from '../error/response_error.js';

const downloadDataExcel = async (req, res, next) => {
    try {
        const buffer = await excelExportService.exportDataToExcelBuffer();
        
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        res.setHeader('Content-Disposition', 'attachment; filename=data_sales.xlsx');
        res.setHeader('Content-Length', buffer.length);
        
        res.status(200).send(buffer);
        
    } catch (error) {
        next(error);
    }
};

const previewSalesData = async (req, res, next) => {
    try {
        const dataSales = await resellerService.getDataSales();
        const formattedData = dataSales.map(sales => {
            const atasan = sales.atasan;

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
                m_name: sales.m_name,
                m_current_position: sales.m_current_position
            };
        });

        res.status(200).json({
            success: true,
            message: "Success get sales data for preview",
            data: formattedData,
            total_records: formattedData.length,
            export_info: {
                available_formats: ['excel'],
                endpoint: '/api/export/sales/excel'
            }
        });
        
    } catch (error) {
        next(error);
    }
};

export default {
    downloadDataExcel,
    previewSalesData
};