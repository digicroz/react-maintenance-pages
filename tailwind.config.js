/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    prefix: 'rmp-',
    important: false,

    corePlugins: {
        preflight: false,
        container: false,
        float: false,
        clear: false,
        objectPosition: false,
        overscrollBehavior: false,
        placeholderColor: false,
        placeholderOpacity: false,
        verticalAlign: false,
        accessibility: false,
        resize: false,
        userSelect: false,
        fill: false,
        stroke: false,
        strokeWidth: false,
    },

    theme: {
        extend: {},
    },
    plugins: [],

    safelist: [
        'rmp-animate-spin',
        'rmp-hidden',
        'md:rmp-flex',
    ],
}
