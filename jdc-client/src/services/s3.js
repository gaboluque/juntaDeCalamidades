import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET,
});

const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;

const jdcBucket = new AWS.S3({
  params: { Bucket: bucketName },
  region: "us-east-1",
});

export const uploadBookPage = (file, id, callback, setProgress) => {
  const key = `book/${id}.jpg`;
  const params = {
    Body: file,
    Bucket: bucketName,
    Key: key,
  };

  jdcBucket
    .putObject(params)
    .on("httpUploadProgress", (evt) => {
      if (setProgress) setProgress(Math.round((evt.loaded / evt.total) * 100));
    })
    .send((err) => {
      if (err && callback) callback(err);
      if (callback)
        callback(null, `https://${bucketName}.s3.amazonaws.com/${key}`);
    });
};

export const getAllBookPages = (callback) => {
  const params = {
    Bucket: bucketName,
    Prefix: "book/",
  };

  jdcBucket.listObjects(params, (err, data) => {
    if (err) {
      console.log(err);
      if (callback) callback(err);
      return;
    }

    if (callback) callback(null, data.Contents);
  });
}