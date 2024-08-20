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
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ClearIcon from '@mui/icons-material/Clear';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { TablePagination, TextField } from '@mui/material';
import { Box } from '@mui/system';

function Dashboard() {
  const [summary, setSummary] = useState({
    totalRecords: 0,
    maleCount: 0,
    femaleCount: 0,
  });

  const [allRows, setAllRows] = useState([]); // Store all data
  const [filteredRows, setFilteredRows] = useState([]); // Store filtered data
  const [fileOptions, setFileOptions] = useState([]);
  const [filePieData, setFilePieData] = useState([]);
  const [pg, setpg] = useState(0);
  const [rpg, setrpg] = useState(5);
  const [errorDialogOpen, setErrorDialogOpen] = useState(false); // State to control error dialog visibility
  const [error, setError] = useState(''); // State to store error message

  // Filter states
  const [nicFilter, setNicFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');
  const [fileFilter, setFileFilter] = useState('');

  useEffect(() => {
    fetchSummary();
    fetchNICData();
    fetchFileNames();
  }, []);

  const fetchSummary = () => {
    axios.get('http://localhost:3002/nic/summary')
      .then(response => setSummary(response.data))
      .catch(error => setError('Error fetching summary data:', error));
  };

  const fetchNICData = () => {
    axios.get('http://localhost:3002/nic/data')
      .then(response => {
        const formattedData = response.data.map(row => ({
          ...row,
          birthday: dayjs(row.birthday).format('YYYY-MM-DD'),
        }));
        setAllRows(formattedData); // Set all rows with the fetched data
        setFilteredRows(formattedData); // Initialize filteredRows with all data
        calculateFilePieData(formattedData);
      })
      .catch(error => setError('Error fetching NIC data:', error));
  };

  const fetchFileNames = () => {
    axios.get('http://localhost:3002/nic/files')
      .then(response => setFileOptions(response.data))
      .catch(error => setError('Error fetching file names:', error));
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

  // Apply filters
  const handleFilter = () => {
    let newFilteredRows = allRows;

    if (nicFilter) {
      newFilteredRows = newFilteredRows.filter(row => row.nic_number.includes(nicFilter));
    }
    if (genderFilter) {
      newFilteredRows = newFilteredRows.filter(row => row.gender === genderFilter);
    }
    if (fileFilter) {
      newFilteredRows = newFilteredRows.filter(row => row.file_name === fileFilter);
    }

    setFilteredRows(newFilteredRows); // Update filteredRows with filtered data
  };

  const handleClear = () => {
    // Clear filters and reset to all data
    setNicFilter('');
    setGenderFilter('');
    setFileFilter('');
    setFilteredRows(allRows); // Reset to all data
  };

  const handleChangePage = (event, newpage) => {
    setpg(newpage);
  };

  const handleChangeRowsPerPage = (event) => {
    setrpg(parseInt(event.target.value, 10));
    setpg(0);
  };

  const handleErrorDialogClose = () => {
    setErrorDialogOpen(false); // Close the error dialog
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
              <TextSnippetIcon className='lg:text-4xl md:text-3xl text-2xl' />
              <h1>Total Records -</h1>
              <h1>{summary.totalRecords}</h1>
            </div>
            <div className='w-fit h-fit bg-bg-color p-4 lg:text-2xl md:text-xl font-bold rounded-lg flex gap-2 items-center cursor-pointer'>
              <ManIcon className='lg:text-4xl md:text-3xl text-2xl' />
              <h1>Male -</h1>
              <h1>{summary.maleCount}</h1>
            </div>
            <div className='w-fit h-fit bg-bg-color p-4 lg:text-2xl md:text-xl font-bold rounded-lg flex gap-2 items-center cursor-pointer'>
              <WomanIcon className='lg:text-4xl md:text-3xl text-2xl' />
              <h1>Female -</h1>
              <h1>{summary.femaleCount}</h1>
            </div>
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
          <div className='mt-10 w-full flex flex-col justify-center gap-4'>
            <div className='flex md:flex-row flex-col gap-2 justify-center items-center lg:gap-3 md:gap-1'>
              <Box className='w-52'>
                <FormControl fullWidth>
                  <TextField
                    size='small'
                    label='NIC Number'
                    variant='outlined'
                    className='w-full'
                    value={nicFilter}
                    onChange={(e) => setNicFilter(e.target.value)}
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
                    label="gender"
                    value={genderFilter}
                    onChange={(e) => setGenderFilter(e.target.value)}
                  >
                    <MenuItem value={'Male'}>Male</MenuItem>
                    <MenuItem value={'Female'}>Female</MenuItem>
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
                    label="Select File"
                    value={fileFilter}
                    onChange={(e) => setFileFilter(e.target.value)}
                  >
                    {fileOptions.map((fileName, index) => (
                      <MenuItem key={index} value={fileName}>{fileName}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button className='flex gap-1 items-center' variant="contained" sx={{ minWidth: 120 }} onClick={handleFilter}>
                <FilterAltIcon fontSize='small' />
                Filter
              </Button>
              <Button className='flex gap-1 items-center' variant='outlined' color='error' sx={{ minWidth: 120 }} onClick={handleClear}>
                <ClearIcon fontSize='small' />
                Clear
              </Button>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650, borderRadius: 20 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell className='font-bold' align='center'>NIC Number</TableCell>
                    <TableCell className='font-bold' align="center">Date of Birth</TableCell>
                    <TableCell className='font-bold' align="center">Age</TableCell>
                    <TableCell className='font-bold' align="center">Gender</TableCell>
                    <TableCell className='font-bold' align="center">File Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRows.slice(pg * rpg, pg * rpg + rpg).map((row, index) => (
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
              count={filteredRows.length}
              rowsPerPage={rpg}
              page={pg}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
          <div>
            {/* Error Dialog */}
            <Dialog PaperProps={{ style: {display: 'flex', alignItems:'center', textAlign:'center', color:'#f44336'} }} open={errorDialogOpen} onClose={handleErrorDialogClose}>
                <DialogTitle>Error</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {error}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' className='text-error-color' onClick={handleErrorDialogClose} autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard;