// postcss.config.cjs
module.exports = {
  plugins: {
    // enables nesting like &::before in your globals.css
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {},
  },
};
