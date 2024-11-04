export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {
      overrideBrowserslist: [
        'last 2 versions',
        '> 1%',
        'Firefox ESR',
        'not dead',
        'not IE 11',
        'not op_mini all',
        'chrome >= 87',
        'firefox >= 78',
        'safari >= 13',
        'edge >= 88'
      ],
      grid: 'autoplace'
    },
  },
}