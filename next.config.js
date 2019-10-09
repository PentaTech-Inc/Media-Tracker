const withCSS = require('@zeit/next-css');
require('dotenv').config()
const path = require('path');
const Dotenv = require('dotenv-webpack');

const withImages = require('next-images');
const withFonts = require('next-fonts');

const withPlugins = require('next-compose-plugins');


// VERSION 3 (works with footer)
module.exports = withPlugins([withCSS, withFonts, withImages]);

// VERSION 2 (works but doesn't work with footer)

// module.exports = withPlugins([withFonts, withCSS(withImages({
//     inlineImageLimit: 16384,
//     webpack(config, options) {
//         config.plugins = config.plugins || [];
//         config.plugins = [
//             ...config.plugins,

//             // Read the .env file
//             new Dotenv({
//                 path: path.join(__dirname, '.env'),
//                 systemvars: true
//             })
//         ];
//         return config    
//     }
// }))]);

// VERSION 1 (original block of code)
 
// module.exports = withCSS(withImages({
//     inlineImageLimit: 16384,
//     webpack(config, options) {
//         config.plugins = config.plugins || [];
//         config.plugins = [
//             ...config.plugins,

//             // Read the .env file
//             new Dotenv({
//                 path: path.join(__dirname, '.env'),
//                 systemvars: true
//             })
//         ];
//         return config
//     }
// }));