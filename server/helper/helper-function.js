const s3Helper = require('../utils/s3-helper.js')
const uploadFile = async (file) => {
    try {
        if (!file) {
            throw new Error('No file found')
        }
        const fileType = file.mimetype;
        const content = file.buffer;
        const fileKey = `report/${Date.now()}.${fileType.split('/')[1]}`;
        const key = await s3Helper.uploadToS3(content, fileKey, fileType);
        return key;
    } catch (error) {
       throw error;
    }
};

module.exports = {
    uploadFile
}