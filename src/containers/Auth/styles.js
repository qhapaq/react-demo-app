import styleBase from '../../styleBase'

const styles = theme => ({
  ...styleBase(theme),
  root: {
    background: theme.app.color5,
    height: '100%'
  },
  card: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: theme.spacing.unit * 42,
      flexBasis: theme.spacing.unit * 42
    },
    padding: theme.spacing.unit,
    boxShadow: '0px 0px 20px 0px rgba(233,234,239,1)!important',
    '& p': {
      paddingLeft: theme.spacing.unit * 2,
      position: 'relative',
      '&:before': {
        content: '""',
        display: 'inline-block',
        height: theme.spacing.unit,
        width: theme.spacing.unit,
        position: 'absolute',
        left: 0,
        top: 6,
        borderRadius: '50%',
        backgroundColor: '#e2e2e4',
        marginRight: theme.spacing.unit,
      }
    },
    '& a': {
      color: '#ff9700',
      textDecoration: 'none',
    },
  },
  cardHeader: {
    //paddingBottom: 0,
    '& svg': {
      width: 44,
      height: 44,
    },
    '& span:first-of-type': {
      fontSize: 20,
      lineHeight: 1
    }
  },
  cardContent: {
    padding: '0 16px 16px!important',
    '& > div:first-of-type': {
      minHeight: theme.spacing.unit * 10,
    }
    //minHeight: theme.spacing.unit * 10,
    //position: 'relative'
  },
  button: {
    margin: [theme.spacing.unit * 3,  0, theme.spacing.unit * 2]
  },
  iconButton: {
    color: 'white',
    margin: [-4, theme.spacing.unit, -4, -4]
  },
})

export default styles