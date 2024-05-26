interface IConfig {
  port: number;
  jwt_secret: string;
  mongoUrl: string;
  saltRounds: number;
  cloudinary_cloud: string;
  cloudinary_secret: string;
  cloudinary_api: string;
}

export {IConfig};
