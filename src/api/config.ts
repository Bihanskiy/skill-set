interface IAppConfig {
    baseURL: string;
}

const version = "api/v1";

const AppConfig: IAppConfig = {
    baseURL: `https://api.wisey.app/${version}/`,
};

export default AppConfig;