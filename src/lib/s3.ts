import AWS from "aws-sdk";

// Function for uploading a file to AWS S3
export async function uploadToS3(file: File) {
  try {
    // Create an S3 client
    const s3 = new AWS.S3({
      region: "ap-southeast-1", // AWS region where the S3 bucket is located
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCES_KEY_ID!, // AWS access key ID
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECERET_KEY!, // AWS secret access key
      },
    });

    // Generate a unique key for the S3 object by combining 'uploads/', a timestamp, and replacing spaces in the file name with hyphens
    const file_key =
      "uploads/" + Date.now().toString() + file.name.replace(" ", "-");

    // Define parameters for the S3 upload
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!, // Name of the S3 bucket
      Key: file_key, // Unique key for the S3 object
      Body: file, // The actual file data
    };

    // Use the S3 client to upload the file
    const upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(
          "uploading to S3 ...",
          parseInt(((evt.loaded * 100) / evt.total).toString())
        ) + "%";
      })
      .promise();

    // Wait for the upload to complete
    await upload.then((data) => {
      console.log("Successfully uploaded to S3", file_key);
    });

    // Return a Promise that resolves with the file key and file name
    return Promise.resolve({
      file_key,
      file_name: file.name,
    });
  } catch (error) {
    // Handle any errors that may occur during the upload process
  }
}

// Function to generate an S3 URL for accessing a file
export function getS3Url(file_key: string) {
  // Construct the URL using the S3 bucket name, AWS region, and the provided file key
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-south-1.amazonaws.com/${file_key}`;
  return url;
}
