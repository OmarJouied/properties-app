This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


## Pages

/ shows us the properties

/tenants shows us the tenants

/signin to log in page

/signup to register page

## Api EndPoints

### /api/v1/users
GET Method: get all users

POST Method: create user

### /api/v1/properties
GET Method: get all properties

POST Method: create propertie

PATCH Method: update propertie

DELETE Method: delete propertie

### /api/v1/tenants
GET Method: get all tenants

POST Method: create tenant

PATCH Method: update tenant

DELETE Method: delete tenant

## ENV Varaible
MYSQL_HOST: database host

MYSQL_PORT: database port

MYSQL_DATABASE: database name

MYSQL_USER: database user

MYSQL_PASSWORD: database password

NEXTAUTH_SECRET: for authentication