import React, {useEffect, useRef, useState} from 'react';
import NavBar from '../Components/NavBar';
import { Button } from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';
import { useReactToPrint } from 'react-to-print';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';

function Reports() {

  const [rows, setRows] = useState([]);

  const printRef = useRef();  

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useEffect(() => {
    fetchNICData();
  },[]);

  const fetchNICData = (filters = {}) => {
    axios.get('http://localhost:3002/nic/data', { params: filters })
        .then(response => {
            const formattedData = response.data.map(row => ({
                ...row,
                birthday: dayjs(row.birthday).format('YYYY-MM-DD'), // Format the birthday
            }));
            setRows(formattedData);
        })
        .catch(error => {
            console.error('Error fetching NIC data:', error);
        });
};

  return (
    <div className='font-montserrat'>
        <NavBar/>
        <div className='relative flex items-center justify-center w-full h-screen bg-bg-color'>  
            <div className='absolute items-center flex flex-col top-20 h-[85%] w-[95%] bg-primary rounded-xl text-black py-6 px-10 gap-3 overflow-hidden overflow-y-scroll'>
                <h1 className='mb-3 font-bold lg:text-3xl text-2xl'>Reports</h1>
                <div ref={printRef} className='w-full flex flex-col rounded-md justify-center'>
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
                          {rows.map((row, index) => (
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
                </div>
                <Button onClick={handlePrint} variant='contained' className='flex gap-2 md:flex-row flex-col md:w-52 w-40'>
                  <LocalPrintshopIcon fontSize='medium'/>
                  Print Report
                </Button>
            </div>
        </div>
    </div>
  )
}

export default Reports
