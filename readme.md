[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs) [![Github All Releases](https://img.shields.io/github/downloads/terrydo/pug-tailwind-ts-template/total.svg)]()

# Pug Tailwind Typescript Template

A quick start for modern PSD to HTML jobs. This template includes:

- Webpack
- Pug
- Typescript + Babel
- PostCSS + TailwindCSS
  This is the minimal Multi-page Webpack setup with above tools. You might have to make changes to suit your needs.

## Installation

First, clone the repo.

Secondly, install the project with Yarn (preferred)

```bash
  yarn install
```

To start developing, run

```bash
  yarn start
```

To build for production, run

```bash
  yarn build
```

## How does this work?

First, it reads all the `.pug` files in `src/views` (**Not recursive**).

Every found view file will then becomes a new HTML entry file through `HtmlWebpackPlugin`.

And, it has a main Typescript entry file (index.ts) in `src/js/index.ts`, as well as many _page-specific scripts_ in `src/js/pages`.
For every _page-specific script_, it becomes a new webpack entry, ready to be built into a `[name].bundle.js` file.

In the page's `foot` (`src/views/partials/foot.pug`), we do some logical check to ensure the main script is loaded along with the page-specific script.

**Note**:

- Page-specific CSS is not implemented yet for the sake of simplicity.
- Be careful when you make changes to the bundle's output filename, it might breaks the template!

## Authors

- [@terrydo](https://www.github.com/terrydo)

## Feedback

If you have any feedback, please reach out to me at hou.dobaotrung@gmail.com or make issues. Feel free to make pull requests to help me improve this ting.
