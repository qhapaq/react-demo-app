import createMuiTheme from 'material-ui/styles/createMuiTheme'
import createPalette from 'material-ui/styles/createPalette'
import shadows from 'material-ui/styles/shadows'
import { fade } from 'material-ui/styles/colorManipulator'

shadows[10] = '0px 1px 5px 0px rgba(100,100, 110, 0.2), 0px 1px 2px 0px rgba(100,100, 110, 0.14), 0px 3px 1px -2px rgba(100,100, 110, 0.12)'
shadows[2] = "0px 1px 5px 0px rgba(100,100, 110, 0.2), 0px 2px 2px 0px rgba(100,100, 110, 0.14), 0px 3px 1px -2px rgba(100,100, 110, 0.12)"

const background = '#f8f8fa'
const color4 = '#444454'
const color1 = '#4680ff'
const hoverItem = fade(color1, 0.12)

const primaryColorApp = {
  '50': '#e9f0ff',
  '100': '#c8d9ff',
  '200': '#a3c0ff',
  '300': '#7ea6ff',
  '400': '#6293ff',
  '500': '#4680ff',
  '600': '#3f78ff',
  '700': '#376dff',
  '800': '#2f63ff',
  '900': '#2050ff',
  'A100': '#95b6ff',
  'A200': '#6294ff',
  'A400': '#2f71ff',
  'A700': '#155fff',
  contrastDefaultColor: 'light'
}

const theme = createMuiTheme({
  palette: createPalette({
    type: 'light',
    primary: primaryColorApp
  }),
  overrides: {
    MuiInput: {
      underline: {
        '&:before': {
          backgroundColor: 'rgba(0, 0, 0, 0.25)'
        },
        '&:hover:not($disabled):before': {
          backgroundColor: 'rgba(0, 0, 0, 0.35)',
          height: 1,
        },
      }
    },
    MuiMenuItem: {
      root: {
        color: color4,
        '&:focus': {
          background: hoverItem,
          color: color1,
        },
        '&:hover': {
          backgroundColor: hoverItem,
          color: color1,
        },
      },
      selected: {
        backgroundColor: hoverItem,
        color: color1,
      },
    },
    /*MuiBackdrop: {
      root: {
        backgroundColor: 'rgba(9, 30, 66, .3)'
      }
    },*/
    MuiListItem: {
      keyboardFocused: {
        backgroundColor: hoverItem,
        color: color1,
      },
      button: {
        '&:hover': {
          backgroundColor: hoverItem,
          color: color1,
        }
      }
    },
    MuiCircularProgress: {
      circle: {
        strokeWidth: 2
      }
    },
    MuiButton: {
      root: {
        padding: [4, 16],
        minHeight: 32,
      },
      label: {
        lineHeight: '24px',
        '& > svg + span': {
          marginLeft: 8
        }
      }
    },
    MuiTableBody: {
      root: {
        fontSize: 'inherit'
      }
    },
    MuiDialog: {
      paperWidthSm: {
        width: '100%'
      }
    }
  },
  shadows: shadows,
})

theme.palette.background.default = background
theme.palette.background.contentFrame = hoverItem
theme.palette.common.lightBlack = 'rgba(9, 30, 66, .3)'

theme.app = {
  color1,
  color2: '#fb617f',
  color2b: '#ffe0e6',
  color3: '#feb64d',
  color4,
  color5: background,
  color6: '#53c419', //#53c3c6
  borderRadius: 4
}
//console.log(theme)
export default theme
