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
This project is deployed automatically to the board@jumbocode.org Vercel account on push.

You can log into this Vercel account by selecting “continue with email” on
[vercel.com/login](https://vercel.com/login), then clicking the email sent to board@jumbocode.org.

To deploy manually (you shouldn‘t need to do this):
1. Run `npx vercel login` and log in with the board@jumbocode.org email.
2. Verify that `npx vercel whoami` returns “jumbocode”
3. Run `npx vercel . --prod` in the root of this project.
