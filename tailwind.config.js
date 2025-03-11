/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
      colors:{
        pink:"#FF497C",
        grayColor:"#f5f5f5",
        beige:"#f9f3eb",
        softbeige:"#f6f0ef",
        nude:"#f5ddd8"
      },
      screens:{
        xs: "480px"
      }
      },
      container: {
        center: true, 
        padding: "2rem", 
      },
     
    },
    plugins: [require("daisyui")], 
  };
  