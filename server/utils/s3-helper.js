const AWS = require("aws-sdk")
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
let s3 = new AWS.S3({
    accessKeyId: process.env.S3_ACCESS_ID,
    secretAccessKey: process.env.S3_SECRET_ID,
});

/*****************************************************************
 * @createdBy : Nikhil                                 
*/
module.exports.uploadToS3 = async function (content, fileKey, contentType) {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileKey,
            Body: content,
            ACL: 'public-read',
            ContentType: contentType,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, async (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    const location = data.Location;
                    const keyFromLocation = location.substring(location.lastIndexOf('/') + 1);
                    resolve(keyFromLocation);
                } 
            });
        });
    } catch (error) {
        console.log(error)
    } 
};

// *****************************************************************

module.exports.uploadToMS3 = async function (content, fileKey, contentType) {
    try {
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileKey,
            Body: content,
            ACL: 'public-read',
            ContentType: contentType,
        };
        return new Promise((resolve, reject) => {
            s3.upload(params, async (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    const location = data.Location;
                    const keyFromLocation = location.substring(location.lastIndexOf('/') + 1);
                    resolve(keyFromLocation);
                }
            });
        });
    } catch (error) {
        console.log(error)
    }
};



/*****************************************************************
 * @createdBy : N                                       
 */
module.exports.getDataFromS3 = async function (fileKey) {
    try {
        let params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileKey
        };
        return new Promise((resolve, reject) => {
            s3.getObject(params, (error, data) => {
                if (error) {
                    console.log(error)
                    reject(error)
                } else {
                    resolve(data)
                }
            });
        })
    } catch (error) {
        console.log(error)
    }
}

/*****************************************************************
 * @createdBy : N                                       
 */
module.exports.deleteDataFromS3 = async function (fileKey) {
    try {
        let params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileKey
        };
        return new Promise((resolve, reject) => {
            s3.deleteObject(params, (error, data) => {
                if (error) {
                    reject(error)
                } else {
                    resolve(200)
                }
            });
        })
    } catch (error) {
        console.log(error)
    }
}