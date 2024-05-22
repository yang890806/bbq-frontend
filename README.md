This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the package:
```bash
npm install --global yarn

# 安裝package.json內的套件
yarn

# 安裝指定套件
yarn add [package]
```

Second, create `.env` file:
* Copy `env.example` to `.env`

Third, run the development server:

```bash
# Run
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Fetch API

First, git clone backend api repository:

```bash
git clone https://github.com/Yslin0728/webapp.git
```

Second, install packages:

```bash
npm install
```

Third, checkout `develop` branch:

```bash
git checkout develop
```

Fourth, run the development server:
```bash
node server.js
```

Fifth, modify `.env` of frontend and backend:
* Frontend:
```bash
API_ROOT = http://localhost:5000 # 若port已被佔用，可自行更改port，但port要與後端的.env一致
```

* Backend:
```bash
SERVER_PORT=5000
```

## About GitHub

### Clone Repository


```bash
git clone https://github.com/yang890806/bbq-frontend.git
```

### Branch
Check all branches in local:
* main: 正式版
* dev: 開發測試版
* feat/[...]: 個別開發功能的分支

```bash
git branch
```

Checkout branch (切換分支):

```bash
git checkout [your-branch]
```

Create new branch:
```bash
git branch [new-branch-name]
```

If you want to push to origin branch:

```bash
git add .
git commit -m "[Write something]"
git push origin [your-branch]
```

Pull from origin branch to local (把遠端分支的最新版本拉下來到本地端):
* 記得將分支切換到相對應的分支 (`git checkout [your-branch]`)

```bash
git pull origin [your-branch]
```

Merge the other branch to your branch
* Example: 將遠端dev分支最新版本更新至我目前開發的分支(`feat/abc`)

```bash
git checkout dev
git pull origin dev
git checkout feat/abc
git merge dev
```

If merged, conflicts happen:

* Resolve manually
* Add, commit, and push to origin branch

```bash
git add .
git commit -m "fix: Resolve conflict"
git push origin feat/abc
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
