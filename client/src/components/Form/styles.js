import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  input: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'left',
  },
  fileInput: {
    width: '97%',
    margin: '0px auto',
    marginLeft: '100px',
    // justifyContent: 'left',
  },
  buttonSubmit: {
    marginBottom: 10,
    marginTop: 5,
  },
}));