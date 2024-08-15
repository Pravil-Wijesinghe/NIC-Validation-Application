import React, { useState, useEffect } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
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
import { TextField } from '@mui/material';
import { TablePagination } from '@mui/material';

function Dashboard() {

    const [summary, setSummary] = useState({
        totalRecords: 0,
        maleCount: 0,
        femaleCount: 0,
    });

    const [rows, setRows] = useState([]);
    const [birthday, setBirthday] = useState(null);
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [file, setFile] = useState('');
    const [fileOptions, setFileOptions] = useState([]);
    const [filePieData, setFilePieData] = useState([]);
    const [pg, setpg] = useState(0); 
    const [rpg, setrpg] = useState(5); 

    useEffect(() => {
        fetchSummary();
        fetchNICData();
        fetchFileNames();
    });

    const fetchSummary = () => {
        axios.get('http://localhost:3002/nic/summary')
            .then(response => {
                setSummary(response.data);
            })
            .catch(error => {
                console.error('Error fetching summary data:', error);
            });
    };

    const fetchNICData = (filters = {}) => {
        axios.get('http://localhost:3002/nic/data', { params: filters })
            .then(response => {
                const formattedData = response.data.map(row => ({
                    ...row,
                    birthday: dayjs(row.birthday).format('YYYY-MM-DD'), // Format the birthday
                }));
                setRows(formattedData);
                calculateFilePieData(formattedData); // Call the function here to calculate Pie Chart data
            })
            .catch(error => {
                console.error('Error fetching NIC data:', error);
            });
    };

    const fetchFileNames = () => {
        axios.get('http://localhost:3002/nic/files')
            .then(response => {
                setFileOptions(response.data); // Set file options from the backend response
            })
            .catch(error => {
                console.error('Error fetching file names:', error);
            });
    };

    const calculateFilePieData = (data) => {
        const fileCounts = data.reduce((acc, row) => {
            acc[row.file_name] = (acc[row.file_name] || 0) + 1;
            return acc;
        }, {});

        const pieData = Object.entries(fileCounts).map(([fileName, count], index) => ({
            id: index,
            value: count,
            label: fileName,
        }));

        setFilePieData(pieData);
    };  

    const handleFilter = () => {
        const filters = {
            birthday: birthday ? birthday.format('YYYY-MM-DD') : null,
            age: birthday ? null : age,  // Disable age filter if birthday is selected
            gender,
            file
        };
        fetchNICData(filters);
    };

    const handleClear = () => {
        setBirthday(null);
        setAge('');
        setGender('');
        setFile('');
        fetchNICData();
    };

    const inputProps = {
        min: 0,
        max: 120,
        step: 1,
    };

    function handleChangePage(event, newpage) { 
        setpg(newpage); 
    }; 
  
    function handleChangeRowsPerPage(event) { 
        setrpg(parseInt(event.target.value, 10)); 
        setpg(0); 
    }; 

  return (
    <div className='font-montserrat'>
      <NavBar />
      <div className='relative flex items-center justify-center w-full h-screen bg-bg-color'>
        <div className='absolute flex flex-col top-20 h-[85%] w-[95%] bg-primary rounded-xl text-black py-6 md:px-10 px-6 overflow-hidden overflow-y-scroll'>
            <div className='flex w-full justify-center'>
                <h1 className='font-bold lg:text-3xl text-2xl'>Dashboard</h1>
            </div>
            <div className='flex md:flex-row flex-col items-center gap-2 lg:gap-10 md:gap-3 w-full justify-center mt-10'>
                <div className='w-fit h-fit bg-bg-color p-4 lg:text-2xl md:text-xl font-bold rounded-lg flex gap-2 items-center cursor-pointer'>
                    <TextSnippetIcon className='lg:text-4xl md:text-3xl text-2xl'/>
                    <h1>Total Records -</h1>
                    <h1>{summary.totalRecords}</h1>
                </div>
                <div className='w-fit h-fit bg-bg-color p-4 lg:text-2xl md:text-xl font-bold rounded-lg flex gap-2 items-center cursor-pointer'>
                    <ManIcon className='lg:text-4xl md:text-3xl text-2xl'/>
                    <h1>Male -</h1>
                    <h1>{summary.maleCount}</h1>
                </div>
                <div className='w-fit h-fit bg-bg-color p-4 lg:text-2xl md:text-xl font-bold rounded-lg flex gap-2 items-center cursor-pointer'>
                    <WomanIcon className='lg:text-4xl md:text-3xl text-2xl'/>
                    <h1>Female -</h1>
                    <h1>{summary.femaleCount}</h1>
                </div>
            </div>
            <div className='mt-10 w-full flex flex-col justify-center gap-4'>
                <div className='flex md:flex-row flex-col gap-2 justify-center items-center lg:gap-3 md:gap-1'>
                    <Box className='w-52'>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']}>
                                <DatePicker 
                                    label="Enter Birthday" 
                                    value={birthday} 
                                    onChange={(newValue) => {
                                        setBirthday(newValue);
                                        setAge('');  // Clear age if birthday is selected
                                    }} 
                                    disabled={age !== ''}  // Disable if age is entered
                                    slotProps={{ textField: { size: 'small' } }}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </Box>
                    <Box className='w-52'>
                        <FormControl fullWidth>
                            <TextField 
                                type='number'
                                size='small'
                                label='Age'
                                value={age}
                                onChange={(e) => {
                                    setAge(e.target.value);
                                    setBirthday(null);  // Clear birthday if age is entered
                                }}
                                inputProps={inputProps}
                                disabled={birthday !== null}  // Disable if birthday is selected
                            />
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
                                onChange={(e) => setGender(e.target.value)}
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
                                onChange={(e) => setFile(e.target.value)}
                                >
                                {fileOptions.map((fileName, index) => (
                                    <MenuItem key={index} value={fileName}>{fileName}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Button className='flex gap-1 items-center' variant="contained" sx={{ minWidth: 120 }} onClick={handleFilter}>
                        <FilterAltIcon fontSize='small'/>
                        Filter
                    </Button>
                    <Button className='flex gap-1 items-center' variant='outlined' color='error' sx={{ minWidth: 120 }} onClick={handleClear}>
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
                                <TableCell align="center">File Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
                            <TableRow
                                key={index}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="center" component="th" scope="row">
                                {row.nic_number}
                                </TableCell>
                                <TableCell align="center">{row.birthday}</TableCell>
                                <TableCell align="center">{row.age}</TableCell>
                                <TableCell align="center">{row.gender}</TableCell>
                                <TableCell align="center">{row.file_name}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    className='w-full'
                    rowsPerPageOptions={[5, 10, 25]} 
                    component="div"
                    count={rows.length} 
                    rowsPerPage={rpg} 
                    page={pg} 
                    onPageChange={handleChangePage} 
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </div>
            <div className='flex xl:flex-row flex-col md:gap-6 mt-10 w-full lg:justify-start md:items-center items-center'>
                <div>
                    <BarChart className='lg:w-[500px] lg:h-[400px] md:w-[400px] md:h-[300px] w-[300px] h-[200px]'
                        xAxis={[{ scaleType: 'band', data: ['Male', 'Female'] }]}
                        series={[{ data: [summary.maleCount, summary.femaleCount] }]}
                    />
                </div>
                <div>
                    <PieChart className='lg:w-[800px] lg:h-[400px] md:w-[450px] md:h-[300px] w-[230px] h-[200px]'
                        series={[
                            {
                                data: filePieData, // Use the calculated Pie Chart data
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
