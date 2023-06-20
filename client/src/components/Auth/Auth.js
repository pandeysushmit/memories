import React,{useState} from 'react'
import {Avatar,Button,Container,Grid,Typography,Paper} from '@material-ui/core';
import useStyles from './styles';
import { useDispatch } from 'react-redux';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import jwt_decode from 'jwt-decode';
import { GoogleLogin } from '@react-oauth/google';
import Input from './input';
import { AUTH } from '../../constants/actionTypes';
import { useHistory } from 'react-router-dom';
import { signin,signup } from '../../actions/auth';
const Auth = () => {
  const classes=useStyles();
  // const isSignup=true;
  const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''};
  const [formData,setFormData]=useState(initialState);//State for the Form Data [firstName,lastName,email,password,confirmPassword
  const [isSignup,setIsSignup]=useState(false);//State for Sign Up or Sign In [True for Sign Up and False for Sign In
  const [showPassword,setShowPassword]=useState(false);
  const handleShowPassword=()=>setShowPassword((prevShowPassword)=>!prevShowPassword);//Toggle the State of the Password
  const dispatch=useDispatch();
  const history=useHistory();
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData,history));
    }
    else
    {
      dispatch(signin(formData,history));
    }
    // console.log(formData);
  };
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]:e.target.value});
  };
  const switchMode=()=>{
    setIsSignup((prevIsSignup)=>!prevIsSignup);
    setShowPassword(false);
  };
  const googleSuccess=async (res)=>{
    console.log("ho gya bhai")
    console.log('login success')
    const result = jwt_decode(res.credential)
    const token = res.credential;
    // const token = result.jti;
    console.log(result);
    try {
      dispatch({ type: AUTH, data: { result, token } })
      history.push('/');//To redirect to the Home Page
    } catch (error) {
      console.log(error);
    }
  }
  const googleFailure=(error)=>{
    console.log(error);
    console.log("Google Sign In was unsuccessful. Try Again Later")
  }
  // const state=null;
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon/>
        </Avatar>
      <Typography variant="h5">{isSignup?'Sign Up': 'Sign In'}</Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          {
            isSignup && (
              <>
                <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half/>
                <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
              </>
            )
          }
          <Input name="email" label="Email Address" handleChange={handleChange} type="email"/>
          <Input name="password" label="Password" handleChange={handleChange} type={showPassword? "text":"password"} handleShowPassword={handleShowPassword} />
          {isSignup && <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password"/>}
          <Button type='submit' fullWidth variant="contained" color="primary" className={classes.submit}>
            {isSignup? 'Sign Up': 'Sign In'}
          </Button>
          <Grid container justifyContent="center">
          {/* <GoogleLogin
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          /> */}
          <GoogleLogin
            onSuccess={googleSuccess}
          onError={googleFailure}
          useOneTap
          />
          {/* <GoogleLogin/> */}
            <Button onClick={switchMode}>
              {isSignup?'Already Have an Account? Sign In': 'Dont have an account? Sign Up'}
            </Button>
          </Grid>
        </Grid>

      </form>
      </Paper>
    
    </Container>
  )
}

export default Auth;