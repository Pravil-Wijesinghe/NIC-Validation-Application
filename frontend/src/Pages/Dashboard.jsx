import React from 'react';
import NavBar from '../Components/NavBar';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';

function createData(nic, dob, age, gender, file) {
    return { nic, dob, age, gender, file };
  }
  
  const rows = [
    createData('200200201883', '02/01/2002', 22, 'Male', 'File 1'),
    createData('200200201883', '02/01/2002', 22, 'Male', 'File 2'),
    createData('200200201883', '02/01/2002', 22, 'Male', 'File 3'),
    createData('200200201883', '02/01/2002', 22, 'Male', 'File 4'),
    createData('200200201883', '02/01/2002', 22, 'Male', 'File 2'),
    createData('200200201883', '02/01/2002', 22, 'Male', 'File 4'),
    createData('200200201883', '02/01/2002', 22, 'Male', 'File 3'),
    createData('200200201883', '02/01/2002', 22, 'Male', 'File 1'),
  ];

function Dashboard() {

    const [age, setAge] = React.useState('');

    const handleChangeAge = (event) => {
        setAge(event.target.value);
    };

    const [gender, setGender] = React.useState('');

    const handleChangeGender = (event) => {
        setGender(event.target.value);
    };

    const [file, setFile] = React.useState('');

    const handleChangeFile = (event) => {
        setFile(event.target.value);
    };

  return (
    <div className='font-montserrat'>
      <NavBar />
      <div className='relative flex items-center justify-center w-full h-screen bg-bg-color'>
        <div className='absolute flex flex-col top-20 h-[85%] w-[95%] bg-primary rounded-xl text-black py-6 px-10 overflow-hidden overflow-y-scroll'>
            <div className='flex w-full justify-center'>
                <h1 className='font-bold lg:text-3xl text-2xl'>Dashboard</h1>
            </div>
            <div className='flex md:flex-row flex-col items-center gap-2 lg:gap-10 md:gap-3 w-full justify-center mt-10'>
                <div className='w-fit h-fit bg-bg-color p-4 lg:text-2xl md:text-xl font-bold rounded-lg flex gap-2 items-center cursor-pointer'>
                    <TextSnippetIcon className='lg:text-4xl md:text-3xl text-2xl'/>
                    <h1>Total Records -</h1>
                    <h1>100</h1>
                </div>
                <div className='w-fit h-fit bg-bg-color p-4 lg:text-2xl md:text-xl font-bold rounded-lg flex gap-2 items-center cursor-pointer'>
                    <ManIcon className='lg:text-4xl md:text-3xl text-2xl'/>
                    <h1>Male -</h1>
                    <h1>50</h1>
                </div>
                <div className='w-fit h-fit bg-bg-color p-4 lg:text-2xl md:text-xl font-bold rounded-lg flex gap-2 items-center cursor-pointer'>
                    <WomanIcon className='lg:text-4xl md:text-3xl text-2xl'/>
                    <h1>Female -</h1>
                    <h1>50</h1>
                </div>
            </div>
            <div className='mt-10 w-full flex flex-col justify-center gap-4'>
                <div className='flex md:flex-row flex-col gap-2 justify-center items-center lg:gap-3 md:gap-1'>
                    <Box className='w-52'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker label="Enter Birthday" slotProps={{ textField: { size: 'small' } }}/>
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box className='w-52'>
                        <FormControl fullWidth>
                            <InputLabel size='small' id="demo-simple-select-label">Age</InputLabel>
                            <Select
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={age}
                                label="Age"
                                onChange={handleChangeAge}
                                >
                                <MenuItem value={10}>16</MenuItem>
                                <MenuItem value={20}>17</MenuItem>
                                <MenuItem value={30}>18</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className='w-52'>
                        <FormControl fullWidth>
                            <InputLabel size='small' id="demo-simple-select-label">Gender</InputLabel>
                            <Select
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={gender}
                                label="gender"
                                onChange={handleChangeGender}
                                >
                                <MenuItem value={10}>Male</MenuItem>
                                <MenuItem value={20}>Female</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Box className='w-52'>
                        <FormControl fullWidth>
                            <InputLabel size='small' id="demo-simple-select-label">Select File</InputLabel>
                            <Select
                                size='small'
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={file}
                                label="Select File"
                                onChange={handleChangeFile}
                                >
                                <MenuItem value={10}>File 1</MenuItem>
                                <MenuItem value={20}>File 2</MenuItem>
                                <MenuItem value={30}>File 3</MenuItem>
                                <MenuItem value={30}>File 3</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <Button className='flex gap-1 items-center' variant="contained" sx={{ minWidth: 120 }}>
                        <FilterAltIcon fontSize='small'/>
                        Filter
                    </Button>
                    <Button className='flex gap-1 items-center' variant='outlined' color='error' sx={{ minWidth: 120 }}>
                        <ClearIcon fontSize='small'/>
                        Clear
                    </Button>
                </div>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650, borderRadius: 20 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>NIC Number</TableCell>
                                <TableCell align="center">Date of Birth</TableCell>
                                <TableCell align="center">Age</TableCell>
                                <TableCell align="center">Gender</TableCell>
                                <TableCell align="center">File</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <TableRow
                                key={row.name}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center" component="th" scope="row">
                                    {row.nic}
                                </TableCell>
                                <TableCell align="center">{row.dob}</TableCell>
                                <TableCell align="center">{row.age}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                <TableCell align="center">{row.file}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div className='flex xl:flex-row flex-col md:gap-6 mt-10 w-full lg:justify-start md:items-center items-center'>
                <div>
                    <BarChart className='lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[300px] w-[300px] h-[200px]'
                        xAxis={[{ scaleType: 'band', data: ['Male', 'Female'] }]}
                        series={[{ data: [4,2] }]}
                    />
                </div>
                <div>
                    <PieChart className='lg:w-[800px] lg:h-[400px] md:w-[450px] md:h-[300px] w-[230px] h-[200px]'
                        series={[
                            {
                            data: [
                                { id: 0, value: 10, label: 'File 1', },
                                { id: 1, value: 15, label: 'File 2', },
                                { id: 2, value: 20, label: 'File 3', },
                                { id: 3, value: 25, label: 'File 4', },
                            ],
                            },
                        ]}
                    />
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default Dashboard
