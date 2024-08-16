import React, {useState} from 'react';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function Signup() {

    const [showPassword, setShowPassword] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false); // State to control dialog visibility
    const [errorDialogOpen, setErrorDialogOpen] = useState(false); // State to control error dialog visibility

    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickLogin = () => {
        navigate('/login');
    }

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return passwordRegex.test(password);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Clear previous errors
        setError('');

        // Validate password
        if (!validatePassword(password)) {
            setError('Password must be at least 8 characters long and include both letters and numbers.');
            setErrorDialogOpen(true); // Open error dialog when an error occurs
            return;
        }

        axios.post('http://localhost:3000/signup', { firstName, lastName, username, email, password })
            .then(response => {
                setOpen(true);
                setError(null);
            })
            .catch(error => {
                if (error.response && error.response.data) {
                    setError(error.response.data.message); // Show error message
                } else {
                    setError('An unexpected error occurred.');
                }
                setErrorDialogOpen(true); // Open error dialog when an error occurs
            });
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/login'); // Navigate to the Login page on dialog close
    };

    const handleErrorDialogClose = () => {
        setErrorDialogOpen(false); // Close the error dialog
    };

  return (
    <div className='relative flex items-center justify-center w-full h-screen font-montserrat bg-bg-color'>
      <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10 mx-5'>
      <h1 className='font-bold md:text-3xl text-2xl'>Sign Up</h1>
        <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-3 mt-5'>
            <TextField
                required id="outlined-basic"
                size='small'
                label="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className='md:w-72 w-56 rounded-lg'
            />
            <TextField
                required id="outlined-basic"
                size='small'
                label="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className='md:w-72 w-56 rounded-lg'
            />
            <TextField
                required id="outlined-basic"
                size='small'
                label="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className='md:w-72 w-56 rounded-lg'
            />                                                          
            <TextField
                required id="outlined-basic"
                size='small'
                label="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='md:w-72 w-56 rounded-lg'
            />
            <FormControl required size='small' className='md:w-72 w-56 rounded-lg' variant="outlined">
                <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
            <Button type="submit" variant="contained" className='md:w-52 w-40'>Sign Up</Button>
            <div className='flex md:flex-row flex-col items-center justify-center mt-3'>
                <p>
                    Already have an account?{' '}
                </p>
                <Button onClick={handleClickLogin} variant="text" className='md:w-fit w-fit'>Login</Button>
            </div>
        </form>
      </div>
      <div>
        {/* Success Dialog */}
        <Dialog PaperProps={{ style: {display: 'flex', alignItems:'center', textAlign:'center',} }} open={open} onClose={handleClose}>
            <DialogTitle>Account Successfully Created.</DialogTitle>
            <DialogContent>
                <DialogContentText>
                Click OK to continue to the Login page.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose} autoFocus>
                OK
            </Button>
            </DialogActions>
        </Dialog>
        {/* Error Dialog */}
        <Dialog PaperProps={{ style: {display: 'flex', alignItems:'center', textAlign:'center', color:'#f44336'} }} open={errorDialogOpen} onClose={handleErrorDialogClose}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {error}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button color='error' onClick={handleErrorDialogClose} autoFocus>
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    </div>
    </div>
  )
}

export default Signup
