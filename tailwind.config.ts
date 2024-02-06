import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'open-sans': 'var(--font-open-sans)'
      },
      colors: {
        black: '#1E1F22',
        imagebg: '#DEDEDE',
        grey: '#6C6D73',
        bgbule: '#6EA6E8',
        bgColor: '#F7F7F8',
        chipColor: '#EEEEF0',
        sidebarItem: '#B0B1B6',
        border: "#E1E1E1",
        primary: "#004A7C"
      },
    },
  },
  plugins: [],
};
export default config;
