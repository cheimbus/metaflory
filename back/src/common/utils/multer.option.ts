import * as multer from 'multer';
import * as path from 'path';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException } from '@nestjs/common';

const storage = (): multer.StorageEngine => {
  return multer.diskStorage({
    destination(req, file, cb) {
      const folderName = path.join(__dirname, '../../../../', `uploads`);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname);
      if (
        ext !== '.jpg' &&
        ext !== '.jpeg' &&
        ext !== '.png' &&
        ext !== '.gif'
      ) {
        throw new BadRequestException('잘못된 요청입니다.');
      }
      const fileName = `${path.basename(
        file.originalname,
        ext,
      )}${Date.now()}${ext}`;

      cb(null, fileName);
    },
  });
};

export const multerOptions = () => {
  const result: MulterOptions = {
    storage: storage(),
    limits: {
      fieldNameSize: 200,
      fieldSize: 1024 * 1024,
      fields: 10,
      fileSize: 16777216,
      files: 10,
    },
  };
  return result;
};
