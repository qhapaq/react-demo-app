const styles = theme => ({
  '@global': {
    html: {
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
      height: '100%',
      width: '100%',
      fontFamily: theme.typography.fontFamily
    },
    body: {
      margin: 0,
      height: '100%',
      width: '100%',
      color: theme.app.color4
    },
    '#wrp': {
      height: '100%',
      width: '100%'
    },
    a: {
      textDecoration: 'none'
    },
    '*, :after, :before': {
      boxSizing: 'border-box',
      padding: 0,
      margin: 0,
    },
    '::-webkit-scrollbar': {
      overflow: 'visible',
      width: 10,
      height: 10,
    },
    '::-webkit-scrollbar-button': {
        height: 0,
        width: 0,
    },
    '::-webkit-scrollbar-track': {
        backgroundClip: 'padding-box',
        border: 'solid transparent',
        borderWidth: 0,
    },
    '::-webkit-scrollbar-track:hover, ::-webkit-scrollbar-track:horizontal:hover, ::-webkit-scrollbar-track:active, ::-webkit-scrollbar-track:horizontal:active': {
        backgroundColor: theme.app.color5,
        boxShadow: 'inset 1px 0 0 rgba(68, 68, 84, .06)',
    },
    '::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(68, 68, 84, .3)',
        backgroundClip: 'padding-box',
        border: 'solid transparent',
        borderWidth: 0,
        minHeight: '28px',
    },
    '::-webkit-scrollbar-thumb:hover': {
        backgroundColor: 'rgba(68, 68, 84, .5)',
    },
    '::-webkit-scrollbar-thumb:active': {
        backgroundColor: 'rgba(68, 68, 84, 0.6)',
    }
  }
})
export default styles