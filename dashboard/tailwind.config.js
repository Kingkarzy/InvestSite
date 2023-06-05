/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "480px",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        yellow: { 450: "#F7D046" },
        purple: { 950: "#5B38E3" },
        blue: { 950: '#4182AB' },
      },
      boxShadow: {
        card: "0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.2)",
        cardhover:
          "0 0 1px 0 rgba(189,192,207,0.06),0 10px 16px -1px rgba(189,192,207,0.4)",
        "3xl":
          "0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 2px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        user: "0px 0px 15px -10px rgba(0, 0, 0, 0.75);",
      },
      keyframes: {
        myspin: {
          "0%": { transform: "rotate(0deg) scale(1.75)" },
          "100%": { transform: "rotate(360deg) scale(1.75)" },
        },
      },
      animation: {
        myspin: "myspin 5s linear infinite",
      },
      backgroundImage: {
        image: 'url(../src/assets/images/bg3.jpg)',
        bg: "linear-gradient(90deg, rgba(0, 34, 36, 0.7) 1%, rgba(0, 0, 0, 0.7) 56%, rgba(15, 103, 53, 0.7) 100%), url('../src/assets/images/bg.jpg')",
        bg2: "linear-gradient(90deg, rgba(0, 34, 36, 0.7) 1%, rgba(0, 0, 0, 0.7) 56%, rgba(15, 103, 53, 0.7) 100%), url('../src/assets/images/bg3.jpg')",
        mybg: "linear-gradient(to right, #00ccff, #0040ff, #c509f4, #c20b0b)",
        cardbg:
          "linear-gradient(to top, #4182AB 0%, #38AB99 50%, #F7D046 100%)",
      },
      transition: {
        mytransition: "all 0.25s ease",
      },
    },
  },
  plugins: [],
};
