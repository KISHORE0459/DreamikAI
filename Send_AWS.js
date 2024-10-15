
function SendToAws(file,filename,type){
    AWS.config.region = "ap-south-1";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: "ap-south-1:f6f8d75b-560d-4a11-8b37-67906ac38e41",      });

    const s3 = new AWS.S3();

    const params = {
    Bucket: "dreamik-web-customize-v1",
    Key: "temp/"+filename,
    Body: file,
    ContentType:type
    };
    
    s3.putObject(params, (err, data) => {   if (err) {
        console.error("Error uploading file:", err);
        alert("An error occurred while uploading the file.");
        } else {
        console.log("File uploaded successfully:", data);
        }
    });
}