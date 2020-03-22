<p align="center">
  <a href="https://assetsglobal.s3-us-west-1.amazonaws.com/gifs/hello.gif">
    <img alt="hello" src="https://assetsglobal.s3-us-west-1.amazonaws.com/gifs/hello.gif" width="206" />
  </a>
</p>

# MERN Blog Boilerplate

### Installation

Install the dependencies in each directory and create appropriate config and env files.

**Backend:**
```sh
$ cd backend
$ npm install
$ npm start
```

##### .env
    NODE_ENV=development
    APP_NAME=
    PORT=8000
    CLIENT_URL=http://localhost:3000
    DATABASE=
    JWT_SECRET=
    SENDGRID_API_KEY=
    EMAIL_TO=
    EMAIL_FROM=noreply@seoblog.com
    JWT_RESET_PASSWORD=


**Frontend:**
```sh
$ cd frontend
$ npm install
$ npm run dev
```


##### config.js
    import getConfig from 'next/config';
    const { publicRuntimeConfig } = getConfig();
    export const API = publicRuntimeConfig.PRODUCTION
        ? publicRuntimeConfig.API_PRODUCTION
        : publicRuntimeConfig.API_DEVELOPMENT;
    export const APP_NAME = publicRuntimeConfig.APP_NAME;
    export const DOMAIN = publicRuntimeConfig.PRODUCTION
        ? publicRuntimeConfig.DOMAIN_PRODUCTION
        : publicRuntimeConfig.DOMAIN_DEVELOPMENT;
    export const DISQUS_SHORTNAME = publicRuntimeConfig.DISQUS_SHORTNAME;


##### next.config.js
    const withCSS = require('@zeit/next-css');

    module.exports = withCSS({
        publicRuntimeConfig: {
            APP_NAME: 'SEO Blog',
            API_DEVELOPMENT: 'http://localhost:8000/api',
            API_PRODUCTION: 'https://seoblog.com/api',
            PRODUCTION: false,
            DOMAIN_DEVELOPMENT: 'http://localhost:3000',
            DOMAIN_PRODUCTION: 'https://seoblog.com',
            DISQUS_SHORTNAME: 'seoblog-15'
        },
        devtool: 'source-map'
    });



### License

MIT