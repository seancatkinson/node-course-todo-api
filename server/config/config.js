// constants
const NON_PROD_PORT = 3000;
const DEV_ENV_NAME = 'development';
const TEST_ENV_NAME = 'test';
const MONGODB_NON_PROD_SCHEME_HOST_PORT = 'mongodb://localhost:27017';

const env = process.env.NODE_ENV || DEV_ENV_NAME;
console.log('env *****', env);

if (env === DEV_ENV_NAME) {
    process.env.PORT = NON_PROD_PORT;
    process.env.MONGODB_URI = `${MONGODB_NON_PROD_SCHEME_HOST_PORT}/TodoApp`;
} else if (env === TEST_ENV_NAME) {
    process.env.PORT = NON_PROD_PORT;
    process.env.MONGODB_URI = `${MONGODB_NON_PROD_SCHEME_HOST_PORT}/TodoAppTest`;
}
