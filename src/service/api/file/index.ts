import type { UploadFileInfo } from 'naive-ui';
import { request } from '@/service/request';

// 上传图片
export function uploadImages(file: UploadFileInfo) {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/file/upload',
    method: 'post',
    data: file
  });
}
// 上传文件
export function uploadFiles(file: UploadFileInfo) {
  return request({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/file/upload',
    method: 'post',
    data: file
  });
}
