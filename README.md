# [jumbocode.org](https://jumbocode.org/)
New JumboCode website for 2022 and beyond!

## Dev environment setup
1. Install the latest Node version
2. `cd` to the root of this project
3. Run `npm install`

If you're using VS Code, **make sure to install the
[ESLint extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)**
so that you can see lint errors and conform to the style of the project.

## Running the app in development
Run `npm run dev` from the root of this project, and you should be up and running at
[`localhost:3000`](http://localhost:3000)!

## Deployment
This is deployed to the board@jumbocode.org Vercel account. We deploy it by hand because we cannot
connect a repository that's owned by an organization to a free account. Run `npx vercel .` to deploy
the app, and sign in by email to the board@jumbocode.org account.
