import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';

function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleClickForgotPassword = () => {
        navigate('/ForgotPasswordEnterEmail');
    };

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        axios.post('http://localhost:3000/login/login', { username, password })
          .then(response => {
            // Assuming the backend returns a token upon successful login
            const { token } = response.data;
    
            // Store the token in localStorage (or sessionStorage)
            localStorage.setItem('authToken', token);
    
            // Redirect to the dashboard
            navigate('/dashboard');
          })
          .catch(error => {
            alert('Login failed.');
          });
      };

    return (
        <div className='relative flex items-center justify-center w-full h-screen font-montserrat bg-bg-color'>
            <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10 mx-5'>
                <h1 className='font-bold md:text-3xl text-2xl'>Login</h1>
                <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3 mt-5'>
                    <TextField
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required id="outlined-basic"
                        size='small'
                        label="Username"
                        className='md:w-72 w-56 rounded-lg'
                    />
                    <FormControl required size='small' className='md:w-72 w-56 rounded-lg' variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                    </FormControl>
                    <Button type="submit" variant="contained" className='md:w-52 w-40'>Login</Button>
                    <Button onClick={handleClickForgotPassword} variant="text" className='md:w-52 w-40 text-black'>Forgot Password?</Button>
                </form>
            </div>
        </div>
    );
}

export default Login;