import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Button,
  
} from '@mui/material';
import { Scrollbar } from 'src/components/scrollbar';
import { getInitials } from 'src/utils/get-initials';

export const CustomersTable = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://remotebackend-2.onrender.com/api/v1/getCompany');
        const userData = await response.json();
        console.log(userData.data)
        setData(userData.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://remotebackend-2.onrender.com/api/v1/deleteCompany/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        // Remove the deleted item from the list
        setData(prevData => prevData.filter(item => item._id !== id));
        setSelected(prevSelected => prevSelected.filter(itemId => itemId !== id));
        alert("Deleted Successfully")
        console.log(`Item with ID ${id} deleted successfully.`);
      } else {
        console.error('Failed to delete item:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleSelect = (id) => {
    setSelected((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((itemId) => itemId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  const isSelected = (id) => selected.includes(id);
  
  return (
    <Card>
    
      <Scrollbar>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>COMPANY NAME</TableCell>
                <TableCell>JOB TYPE</TableCell>
                <TableCell>EXPECTED SALARY</TableCell>
                <TableCell>ROLES</TableCell>
                <TableCell>SKILLS</TableCell>
                <TableCell>EXPERIENCE</TableCell>
                <TableCell>APPLY LINK</TableCell>
                <TableCell>DELETE</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((customer) => {
                const isItemSelected = isSelected(customer._id);
               

                return (
                  <TableRow
                    hover
                    key={customer._id}
                    selected={isItemSelected}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={isItemSelected}
                        onChange={() => toggleSelect(customer._id)}
                      />
                    </TableCell>
                    <TableCell>
                      <Stack
                        alignItems="center"
                        direction="row"
                        spacing={2}
                      >
                        <Avatar src={customer.CompanyName}>
                          {getInitials(customer.CompanyName)}
                        </Avatar>
                        <Typography variant="subtitle2">
                          {customer.CompanyName}
                        </Typography>
                      </Stack>
                    </TableCell>
                    <TableCell>{customer.JobType}</TableCell>
                    <TableCell>{customer.ExpectedSalary}</TableCell>
                    <TableCell>{customer.Roles}</TableCell>
                    <TableCell>{customer.Skills}</TableCell>
                    <TableCell>{customer.Experience}</TableCell>
                    <TableCell>{customer.ApplyLink}</TableCell>
                    <TableCell>
                    <Button
    onClick={() => handleDelete(customer._id)}
    variant="contained"
    color="error"
  >
    Delete
  </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </Scrollbar>
      <TablePagination
        component="div"
        count={data.length}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

CustomersTable.propTypes = {
  count: PropTypes.number,
  items: PropTypes.array,
  onDeselectAll: PropTypes.func,
  onDeselectOne: PropTypes.func,
  onPageChange: PropTypes.func,
  onRowsPerPageChange: PropTypes.func,
  onSelectAll: PropTypes.func,
  onSelectOne: PropTypes.func,
  page: PropTypes.number,
  rowsPerPage: PropTypes.number,
  selected: PropTypes.array
};
