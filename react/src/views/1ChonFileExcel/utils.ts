import { ClassModelOriginal } from 'types';

export function arrayToTkbObject(array: any[]): ClassModelOriginal {
  // convert excel based date (1989-Dec-30) to Js based date (1970-Jan-01)
  function convertExcelDateToStringDate(excelDate) {
    // in Excel, based date is 1989-Dec-30: https://stackoverflow.com/questions/36378476/why-does-the-date-returns-31-12-1899-when-1-is-passed-to-it
    // @ts-ignore
    const offsetOfBases = new Date(0) - new Date(1899, 11, 31);
    const jsDate = new Date(excelDate * 24 * 60 * 60 * 1000 - offsetOfBases);
    return (
      jsDate.getFullYear() +
      '-' +
      (jsDate.getMonth() + 1).toString().padStart(2, '0') +
      '-' +
      jsDate.getDate().toString().padStart(2, '0')
    );
  }

  // Enhanced data validation and fallback handling
  const safeParseInt = (value: any, defaultValue: number = 0) => {
    if (value === null || value === undefined || value === '') return defaultValue;
    const parsed = parseInt(value);
    return isNaN(parsed) ? defaultValue : parsed;
  };

  const safeString = (value: any, defaultValue: string = '') => {
    if (value === null || value === undefined) return defaultValue;
    return String(value).trim();
  };

  return {
    STT: safeParseInt(array[0], 0),
    MaMH: safeString(array[1], ''),
    MaLop: safeString(array[2], ''),
    TenMH: safeString(array[3], ''),
    MaGV: safeString(array[4], ''),
    TenGV: safeString(array[5], ''),
    SiSo: safeString(array[6], ''),
    SoTc: safeParseInt(array[7], 0),
    ThucHanh: safeParseInt(array[8], 0),
    HTGD: safeString(array[9], ''),
    Thu: safeString(array[10], ''),
    Tiet: safeString(array[11], ''),
    CachTuan: safeString(array[12], ''),
    PhongHoc: safeString(array[13], ''),
    KhoaHoc: safeString(array[14], ''),
    HocKy: safeString(array[15], ''),
    NamHoc: safeString(array[16], ''),
    HeDT: safeString(array[17], ''),
    KhoaQL: safeString(array[18], ''),
    NBD: typeof array[19] === 'string' ? array[19] : convertExcelDateToStringDate(array[19]),
    NKT: typeof array[20] === 'string' ? array[20] : convertExcelDateToStringDate(array[20]),
    GhiChu: safeString(array[21], ''),
    NgonNgu: safeString(array[22], ''),
  };
}

// from Date object to 'hh:mm dd/MM/yyyy' format
export function toDateTimeString(date: Date) {
  return (
    date.getHours().toString().padStart(2, '0') +
    ':' +
    date.getMinutes().toString().padStart(2, '0') +
    ' ' +
    date.getDate().toString().padStart(2, '0') +
    '/' +
    (date.getMonth() + 1).toString().padStart(2, '0') +
    '/' +
    date.getFullYear()
  );
}

// copied from: https://github.com/SheetJS/sheetjs/blob/master/demos/react/sheetjs.jsx#L134-L136
export const sheetJSFT = [
  '.xlsx',
  '.xlsb',
  '.xlsm',
  '.xls',
  // '.xml',
  '.csv',
  // '.txt',
  // '.ods',
  // '.fods',
  // '.uos',
  // '.sylk',
  // '.dif',
  // '.dbf',
  // '.prn',
  // '.qpw',
  // '.123',
  // '.wb*',
  // '.wq*',
  // '.html',
  // '.htm',
].join(',');
