import React, { useState, useCallback, useRef } from 'react';
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
    CompanyName: '',
    JobType: '',
    ExpectedSalary: '',
    description: '', // Added description field
    Roles: '',
    Skills: '',
    Experience: '',
    ApplyLink: ''
  });

  const [isParagraphMode, setIsParagraphMode] = useState(false);
  const descriptionRef = useRef(null);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setJobDetails((prevJobDetails) => ({
      ...prevJobDetails,
      [name]: value
    }));
  }, []);

  const handleDescriptionChange = useCallback(() => {
    const value = descriptionRef.current.innerText;
    setJobDetails((prevJobDetails) => ({
      ...prevJobDetails,
      description: value
    }));
    // Move cursor to the end after content change
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(descriptionRef.current);
    range.collapse(false);
    selection.removeAllRanges();
    selection.addRange(range);
  }, []);

  const handleToggleParagraphMode = useCallback(() => {
    setIsParagraphMode((prevMode) => !prevMode);
  }, []);

  const handleFormatAction = useCallback((action) => {
    document.execCommand(action, false, null);
    // After format action, trigger description change
    handleDescriptionChange();
  }, [handleDescriptionChange]);

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
              {/* Formatting buttons */}
              <Grid item xs={12}>
                <Box mt={2} mb={2}>
                  {/* Toggle button for paragraph mode */}
                  <Button onClick={handleToggleParagraphMode} variant="outlined"  sx={{ mr: 2 }}>
  {isParagraphMode ? 'Remove Paragraph' : 'Add Paragraph'}
</Button>
<Button onClick={() => handleFormatAction('bold')} variant="outlined" sx={{ mr: 2 }}>Bold</Button>
<Button onClick={() => handleFormatAction('italic')} variant="outlined" sx={{ mr: 1 }}>Italic</Button>
<Button onClick={() => handleFormatAction('underline')} variant="outlined" sx={{ mr: 1 }}>Underline</Button>
<Button onClick={() => handleFormatAction('strikeThrough')} variant="outlined" sx={{ mr: 1 }}>Strike</Button>
<Button onClick={() => handleFormatAction('insertUnorderedList')} variant="outlined" sx={{ mr: 1 }}>Bullet List</Button>
<Button onClick={() => handleFormatAction('insertOrderedList')} variant="outlined" sx={{ mt: 2 }}>Numbered List</Button>

                  {/* Add more buttons for other formatting actions */}
                </Box>
              </Grid>
              {/* Description as contentEditable div */}
              <Grid item xs={12}>
                {/* Description as contentEditable div */}
                <div
                  ref={descriptionRef}
                  contentEditable
                  className="editable-description"
                  style={{
                    border: '1px solid #ccc',
                    minHeight: '150px',
                    padding: '5px',
                    whiteSpace: isParagraphMode ? 'pre-wrap' : 'nowrap',
                    // Align center
                  }}
                  onInput={handleDescriptionChange}
                >
                  {isParagraphMode ? (
                    <p>{jobDetails.description}</p>
                  ) : (
                    jobDetails.description
                  )}
                </div>
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
