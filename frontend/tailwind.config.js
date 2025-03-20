export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
      extend: {
        colors: {
          gray:{
            50:"rgba(255,255,255,0.5)",
            100:"#eeeeef",
            200:"#f9fbfc",
            600:"#64676a",
          },
          purple: {
            200:"#e0e7ff",
            500:"#6a61d4",
            600:"#5046e4"

          },
          
        }
      }
    },
    plugins: [],
    darkMode: 'class'
  }
  