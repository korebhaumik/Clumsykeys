/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      fontFamily: {
        comfortaa: ['Comfortaa', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']
      },
      colors: {
        // cardboard: {
        //   100: "#EDEBE3",
        //   300:  "#D2CFC2",
        //   500: "#989481",
        //   900: "#080909",
        //   'accent-red': "#BE8177",
        //   'accent-green': "#87A383",
        //   'accent-purple': "#8385D9",
        //   'accent-yellow': "#B2A45F",
        //   'accent-error': "#A95406",
        // },
        cardboard: {
          primary: "#EDEBE3",
          fade:  "#D2CFC2",
          unhighlighted: "#989481",
          highlighted: "#080909",

          logo:{
            icon: {
              fg: "#18193F",
              bg: "#87A383",
            },
            text: {
              subheading: '#87A383',
              heading:  '#080909'
            }
          },

          'accent-red': "#BE8177",
          'accent-green': "#87A383",
          'accent-purple': "#8385D9",
          'accent-yellow': "#B2A45F",
          'accent-error': "#A95406",
          'accent-main': '#080909',
          'command-bg': "#080909",
          'command-text': "#EDEBE3",
          'credits': "#989481",
          'caret': '#1d4ed8'
        },
        "dark-forest": {
          primary: "#151B1D",
          fade:  "#242A2D",
          unhighlighted: "#848887",
          highlighted: "#DADADA",

          'accent-red': "#A95406",
          'accent-green': "#87A383",
          'accent-purple': "#8385D9",
          'accent-yellow': "#B2A45F",
          'accent-error': "#A95406",
          'accent-main': '#9BCD86',
          // 'accent-main': '#A300A3',
          'command-bg': "#848887",
          'command-text': "#151B1D",
          'credits': "#848887",
          caret: '#95DBD3',

          logo:{
            icon: {
              fg: "#9BCD86",
              // fg: "#8385D9",
              bg: "#475569",
            },
            text: {
              subheading: '#475569',
              heading:  '#DADADA'
            }
          },
        },
      },
      screens: {
        'hd': '972px', /* 1152px */
        'big': '75rem', /* 1152px */
        '3xl': '1920px',

      }

    }
  },
  plugins: []
};
