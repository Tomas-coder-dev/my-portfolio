module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      animation: {
        glitch: "glitch 0.5s linear infinite",
      },
      keyframes: {
        glitch: {
          "0%": {
            textShadow: "2px 2px #00ffd0, -2px -2px #ff00c8",
            transform: "translate(0)",
          },
          "20%": {
            textShadow: "-2px 2px #00ffd0, 2px -2px #ff00c8",
            transform: "translate(-1px, 1px)",
          },
          "40%": {
            textShadow: "2px -2px #00ffd0, -2px 2px #ff00c8",
            transform: "translate(1px, -1px)",
          },
          "60%": {
            textShadow: "-2px -2px #00ffd0, 2px 2px #ff00c8",
            transform: "translate(-1px, 1px)",
          },
          "80%": {
            textShadow: "2px 2px #00ffd0, -2px -2px #ff00c8",
            transform: "translate(1px, -1px)",
          },
          "100%": {
            textShadow: "none",
            transform: "translate(0)",
          },
        },
      },
    },
  },
  plugins: [],
}