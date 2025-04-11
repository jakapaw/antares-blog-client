# Frontend Application for Antares Blog
For the frontend part of Antares blog, I use Next.js framework because it provide features that can simplify development such as file system routing, image optimization, fast hot reload, etc.

Antares blog site can be accessed from:
http://goantares.cloud

## Setup
To start development or to build, configure environment with these information:
- NEXT_PUBLIC_SERVER_URL
- NEXT_PUBLIC_CLIENT_URL

These env variables are being used for resource requests and link redirects in the blog site.

Start development with: `npm run dev`.

To build, first make sure Strapi backend is running and then `npm run build`. Afterwards, run `npm run start` to start the application.