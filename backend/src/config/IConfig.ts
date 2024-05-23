interface IConfig {
  port: number;
  jwt_secret: string;
  mongoUrl: string;
  saltRounds: number;
}

export {IConfig};
