import { File } from 'formidable';
import * as XLSX from 'xlsx';
import * as path from 'path';
import * as fs from 'fs';
import { v4 } from 'uuid';

export interface IFileRes {
  name: string;
  token: string;
  size: number;
  lastModifiedDate: Date | undefined;
  filepath: string;
  data: any[];
}

// upload dir
const uploadDir = path.join(__dirname, '../upload');

process.on('message', async (file: File) => {
  if (!process.send) {
    console.error('No process object found!');
    return false;
  }

  const result = await handler(file);
  return process.send(result);
});

const handler = async (file: File): Promise<IFileRes> => {
  const wb = XLSX.readFile(file.path);
  const { name, size, lastModifiedDate } = file;

  /* generate array of arrays */
  const data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], { header: 'A' });

  const filepath = await saveFile(file).catch(e => console.error(e));

  if (!filepath) return Promise.reject('save file failed!');
  const token = path.basename(filepath);

  return Promise.resolve({ name, size, token, lastModifiedDate, filepath, data });
};

/**
 * save the given file
 * @param file target file to save
 */
function saveFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) return reject('file paramater should not be null.');

    const oldPath = file.path;
    const filename = v4();
    const newPath = path.join(__dirname, '../upload', filename);

    fs.access(uploadDir, fs.constants.F_OK, err => {
      if (err) fs.mkdirSync(uploadDir);
      fs.rename(oldPath, newPath, err => {
        if (err) reject(err);

        console.log('file has been uploaded at ' + newPath);
        resolve(newPath);
      });
    });
  });
}
