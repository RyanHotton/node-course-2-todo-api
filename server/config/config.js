var env = process.env.NODE_ENV || 'development';

if (env === 'development') {
    process.env.MONGO_ATLAS_URI = "mongodb://localhost:27017/TodoApp";
    process.env.PORT = 3000;
} else if (env === 'test') {
    process.env.MONGO_ATLAS_URI = "mongodb://localhost:27017/TodoAppTest";
    process.env.PORT = 3000;

}