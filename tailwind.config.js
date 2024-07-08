module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'black': '#130E0A',
        green: { default: "#1q5319" },
        "gray": "#00000040"
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
