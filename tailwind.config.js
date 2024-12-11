module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Scannez tous les fichiers React
  ],
  theme: {
    extend: {
      colors: {
        green: {
          900: "#025939", // Vert principal
          700: "#03815d", // Variante de vert pour les hover
          500: "#05a378", // Vert clair
        },
        beige: {
          DEFAULT: "#faf0e6", // Beige principal
          light: "#fef9f4", // Beige clair
        },
        red: {
          600: "#e63946", // Rouge principal
          500: "#ff4d4d", // Rouge clair
        },
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeOut: {
          "0%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        slideDown: {
          "0%": { transform: "translateY(-100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
        slideDown: "slideDown 0.5s ease-in-out",
      },
      boxShadow: {
        DEFAULT: "0 2px 8px rgba(0, 0, 0, 0.1)",
        lg: "0 4px 16px rgba(0, 0, 0, 0.15)",
        xl: "0 6px 20px rgba(0, 0, 0, 0.2)",
      },
    },
  },
  plugins: [],
};
