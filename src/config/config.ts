
const env = process.env.AFRICLEAN_ENV;

let value;

if(env === 'prod') {
    
    value = require('./config.prod');
    
} else {
    
    value = require('./config.dev');
}

export const config = value;