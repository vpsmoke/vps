export const exportExcel = (obj, name = 'rel') => {
  console.log('OBJ', obj);

  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(obj);
    const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
    const excelBuffer = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array'
    });
    saveAsExcelFile(excelBuffer, name);
  });

  const saveAsExcelFile = (buffer, fileName) => {

    import('file-saver').then((module) => {
      if (module && module.default) {
        const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const EXCEL_EXTENSION = '.xlsx';
        const data = new Blob([buffer], {
          type: EXCEL_TYPE
        });

        module.default.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
      }
    });
  };
};
