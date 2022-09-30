import api from '../redux/api';

class UploadFilesService {
  upload(file) {
    let formData = new FormData();
    formData.append('file', file);
    return api.post('/files/excelFile', formData, {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    });
  }
}

export default new UploadFilesService();
