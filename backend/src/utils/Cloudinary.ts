import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { configurations } from "../config/configurations";

cloudinary.config({
  cloud_name: configurations.cloudinary_cloud,
  api_key: configurations.cloudinary_api,
  api_secret: configurations.cloudinary_secret,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log("File Upload started");
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    console.log("CLODINARY ERROR =>", error);
    fs.unlinkSync(localFilePath);
    return null;
  }
};
