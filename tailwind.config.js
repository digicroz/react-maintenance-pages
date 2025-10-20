/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],

    prefix: 'rmp-',
    important: false,
    theme: {
        extend: {},
    },
    plugins: [],
    safelist: [
        'rmp-animate-spin',
    ],
}
