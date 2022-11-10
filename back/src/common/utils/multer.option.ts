import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import { BadRequestException } from '@nestjs/common';

const createFolder = () => {
  try {
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log(error);
  }
  try {
    fs.mkdirSync(path.join(__dirname, '..', `uploads`));
  } catch (error) {
    console.log(error);
  }
};

const storage = (): multer.StorageEngine => {
  createFolder();
  return multer.diskStorage({
    destination(req, file, cb) {
      //* 어디에 저장할 지
      const folderName = path.join(__dirname, '..', `uploads`);
      cb(null, folderName);
    },
    filename(req, file, cb) {
      //* 어떤 이름으로 올릴 지
      const ext = path.extname(file.originalname);
      if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
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
      fieldNameSize: 200, // 필드명 사이즈 최대값 (기본값 100bytes)
      fieldSize: 1024 * 1024, // 필드 사이즈 값 설정 (기본값 1MB),
      fields: 10, // 파일 형식이 아닌 필드의 최대 개수 (기본 값 무제한)
      fileSize: 16777216, //multipart 형식 폼에서 최대 파일 사이즈(bytes) "16MB 설정" (기본 값 무제한)
      files: 10,
    },
  };
  return result;
};
