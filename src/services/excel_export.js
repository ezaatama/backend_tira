import ExcelJs from "exceljs";
import resellerService from "./data_reseller_service.js";

const exportDataToExcel = async () => {
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

    const workBook = new ExcelJs.Workbook();
    const workSheet = workBook.addWorksheet('Data Sales');

    workSheet.columns = [
        { header: 'GEPD ID', key: 'm_mst_gepd', width: 15 },
        { header: 'Nama GEPD', key: 'NamaGEPD', width: 25 },
        { header: 'EPD ID', key: 'm_mst_epd', width: 15 },
        { header: 'Nama EPD', key: 'NamaEPD', width: 25 },
        { header: 'Branch ID', key: 'm_branch_id', width: 12 },
        { header: 'Nama Sales', key: 'm_name', width: 30 },
        { header: 'Posisi', key: 'm_current_position', width: 10 }
    ];

    workSheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFF' } };
    workSheet.getRow(1).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: '4472C4' }
    };
    workSheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center' };

    formattedData.forEach((item, index) => {
        const row = workSheet.addRow(item);

        if (index % 2 === 0) {
            row.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'F2F2F2' }
            };
        }
    });

    workSheet.autoFilter = {
        from: 'A1',
        to: `G${formattedData.length + 1}`
    };

    workSheet.views = [
        { state: 'frozen', xSplit: 0, ySplit: 1 }
    ];

    return workBook;
}

const exportDataToExcelBuffer = async () => {
    const workbook = await exportDataToExcel();
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
};

export default {
    exportDataToExcel,
    exportDataToExcelBuffer
};