const { hostname } = require('os')

/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[
            {
                protocol:'https',
                hostname:'**.googleusercontent.com',

            },
            {
                protocol:'https',
                hostname:'zigi-bakery.s3.amazonaws.com',

            },

        ]
    }
}

 module.exports=nextConfig