# Tigris Movie Database

An example of using Tigris Database + Search with a Movie dataset. Built with
Next.js and Tailwind CSS.

The application loads 35,000 movies into a Tigris Database `movies` collection,
automatically creating a Tigris Search index for the collection, enabling search
functionality in the application.

The repo contains two branches:

1. [`main`](tree/main) - the branch with Database to Search in place with the
   application refactored and optimized to show best practices with Tigris and
   Next.js.
2. [`db-only`](tree/db-only) - the application with just the basic database
   functionality. The application is in a raw state and has not been refactored.

## Install dependencies

```sh
npm i
```

Or the equivalent with other package managers.

## Seed the database

Run this **only once** as it downloads a large JSON file and then uses the
Tigris CLI to populate the Tigris project database:

```sh
npm run tigris:seed
```

## Create a Tigris project

The following command uses the Tigris CLI to log you into Tigris Cloud (you can
signup if you don't already have an account), create a project, and save your
Tigris project configuration to a `.env.local` file.

```sh
npm run tigris:init
```

By default, the name `tigris-movie-db` is as the project name. You can override
this by passing in `--project={name}` flag. For example:

```sh
npm run tigris:init --project awesome-project
```

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the
result.

## Add Tigris Automatic Database to Search Synchronization

If you'd just like to see Tigris Search added check out the `add-search` branch:

```sh
git checkout add-search
```

If you'd like to walk through adding search, follow the
[Tigris Automatic Database to Search Synchronization video](https://www.youtube.com/watch?v=LZVnqUhd-eQ&ab_channel=Tigris).

[![Tigris Automatic Database to Search Synchronization on YouTube](docs/database-search-sync-video.png)](https://www.youtube.com/watch?v=LZVnqUhd-eQ&ab_channel=Tigris)

## Learn More

To learn more about Tigris, take a look at the following resources:

- [Tigris Database TypeScript documentation](https://www.tigrisdata.com/docs/sdkstools/typescript/database/).
- [Tigris Search TypeScript documentation](https://www.tigrisdata.com/docs/sdkstools/typescript/search/).

## Deploy on Vercel

Deploy the Tigris Movie Database to the
[Vercel Platform](https://vercel.com/new).
