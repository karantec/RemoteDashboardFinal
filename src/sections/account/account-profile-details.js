import React, { useState, useCallback } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  Grid
} from '@mui/material';
import axios from 'axios';

export const AccountProfileDetails = () => {
  const [jobDetails, setJobDetails] = useState({
    CompanyName: "",
    JobType:"",
    ExpectedSalary:"",
    Roles:"",
    Skills:"",
    Experience:"",
    ApplyLink:" "

  });

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setJobDetails((prevJobDetails) => ({
      ...prevJobDetails,
      [name]: value
    }));
  }, []);

  const handleSubmit = useCallback(async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('https://remotebackend-2.onrender.com/api/v1/createJob', jobDetails);
      alert('Job posted successfully');
      console.log(response.data);
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Failed to post job');
    }
  }, [jobDetails]);

  return (
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Post Job"
        />
        <CardContent sx={{ pt: 0 }}>
          <Box sx={{ m: -1.5 }}>
            <Grid container spacing={3}>
              {/* Render input fields for job details */}
              {/* Example: */}
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Company Name"
                  name="CompanyName"
                  onChange={handleChange}
                  value={jobDetails.CompanyName}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Job Type"
                  name="JobType"
                  onChange={handleChange}
                  value={jobDetails.JobType}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Expected Salary"
                  name="ExpectedSalary"
                  onChange={handleChange}
                  value={jobDetails.ExpectedSalary}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Roles"
                  name="Roles"
                  onChange={handleChange}
                  value={jobDetails.Roles}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Skills"
                  name="Skills"
                  onChange={handleChange}
                  value={jobDetails.Skills}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Experience"
                  name="Experience"
                  onChange={handleChange}
                  value={jobDetails.Experience}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Apply Link"
                  name="ApplyLink"
                  onChange={handleChange}
                  value={jobDetails.ApplyLink}
                  required
                />
              </Grid>
            </Grid>
          </Box>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button type="submit" variant="contained">
            Post Job
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
