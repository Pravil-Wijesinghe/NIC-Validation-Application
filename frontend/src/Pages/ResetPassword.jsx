import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';

function ResetPassword() {

    const [username, setUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false); // State to control dialog visibility
    const [errorDialogOpen, setErrorDialogOpen] = useState(false); // State to control error dialog visibility


    const navigate = useNavigate();

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/reset-password', {
                username,
                newPassword,
                confirmPassword,
            });

            alert(response.data.message);
            setOpen(true);
            setError(null);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('An unexpected error occurred.');
            }
            setErrorDialogOpen(true); // Open error dialog when an error occurs

        }
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
        <div className='absolute items-center justify-center flex flex-col h-fit w-fit bg-primary rounded-xl text-black py-12 px-10'>
            <h1 className='font-bold md:text-3xl text-2xl'>Reset Password</h1>
            <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center gap-4 mt-6'>
                <TextField
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required 
                    id="outlined-basic"
                    size='small'
                    label="Username"
                    className='md:w-72 w-56 rounded-lg'
                />
                <FormControl required size='small' className='md:w-72 w-56 rounded-lg' variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Eneter New Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
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
                        label="Eneter New Password"
                    />
                </FormControl>
                <FormControl required size='small' className='md:w-72 w-56 rounded-lg' variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Re-eneter New Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
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
                        label="Re-eneter New Password"
                    />
                </FormControl>
                <Button type='submit' variant="contained" className='md:w-52 w-40 mt-2'>Next</Button>
            </form>
        </div>
        <div>
            {/* Success Dialog */}
            <Dialog PaperProps={{ style: {display: 'flex', alignItems:'center', textAlign:'center',} }} open={open} onClose={handleClose}>
                <DialogTitle>Password reset successfully</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                    Please log in with your new password.. Click OK to continue to the Login page.
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

export default ResetPassword
