module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1DA1F2",
        secondary: "#8899A6",
        success: "#28a745",
        danger: "#dc3545",
      },
      gridTemplateColumns: {
        10: "repeat(10, minmax(0, 1fr))",
      },
      spacing: {
        128: "32rem",
      },
    },
  },
  plugins: [],
};
