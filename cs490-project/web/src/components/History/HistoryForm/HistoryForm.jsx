import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@redwoodjs/web';
import { useAuth } from 'src/auth';
import { IconButton, Card, CardContent, Typography, CardActions, makeStyles, TextField, Box } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Toaster, toast } from '@redwoodjs/web/toast';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  card: {
    marginBottom: '20px',
    marginRight: '20px',
    background: '#222',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '10px',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
  },
  cardContent: {
    padding: '20px',
  },
  deleteButton: {
    color: '#ff5555',
  },
  copyButton: {
    color: '#0066cc', // Blue color
    fontSize: 'smaller', // Adjust font size
    backgroundColor: 'transparent', // Transparent background
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'center',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '20px',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  searchField: {
    marginRight: '10px',
  },
}));

const GET_USER_HISTORY_QUERY = gql`
  query GetUserHistory {
    histories {
      id
      inputLanguage
      outputLanguage
      inputText
      outputText
      userId
      createdAt
    }
  }
`;

const DELETE_HISTORY_MUTATION = gql`
  mutation DeleteHistory($id: Int!) {
    deleteHistory(id: $id) {
      id
    }
  }
`;

const HistoryForm = ({ setInputText, setOutputText, setInputLanguage, setOutputLanguage }) => {
  const { currentUser } = useAuth();
  const [page, setPage] = useState(1);
  const [languageFilter, setLanguageFilter] = useState('');
  const [dayFilter, setDayFilter] = useState('');
  const [searchText, setSearchText] = useState('');
  const classes = useStyles();

  const { loading, error, data, refetch } = useQuery(GET_USER_HISTORY_QUERY);

  const [deleteHistory] = useMutation(DELETE_HISTORY_MUTATION, {
    refetchQueries: [{ query: GET_USER_HISTORY_QUERY }],
  });

  const handleDelete = async (id) => {
    console.log("Deleting history with ID:", id);
    try {
      await deleteHistory({ variables: { id } });
      toast.success('History entry deleted successfully');
    } catch (error) {
      toast.error('An error occurred while deleting history entry');
    }
  };

  const onPageChange = (event, newPage) => {
    setPage(newPage);
  };

  if (!currentUser) return <div>You need to sign in to access your history.</div>;
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  let filteredHistory = data.histories
    .filter((historyItem) => historyItem.userId === currentUser.id);

  if (languageFilter && languageFilter !== 'All') {
    filteredHistory = filteredHistory.filter((historyItem) => historyItem.inputLanguage.toLowerCase().includes(languageFilter.toLowerCase()) || historyItem.outputLanguage.toLowerCase().includes(languageFilter.toLowerCase()));
  }

  if (dayFilter) {
    const filterDate = new Date(dayFilter + 'T00:00:00Z'); // Set filter date to midnight UTC
    console.log("Filter Date:", filterDate.toISOString());
    filteredHistory = filteredHistory.filter((historyItem) => {
      const historyDate = new Date(historyItem.createdAt);
      historyDate.setUTCHours(0, 0, 0, 0);
      console.log("History Item Date:", historyDate.toISOString());
      return historyDate.getTime() === filterDate.getTime();
    });
  }
  
  if (searchText) {
    const regex = new RegExp(searchText, 'i'); // Case-insensitive regex
    filteredHistory = filteredHistory.filter((historyItem) => regex.test(historyItem.inputText) || regex.test(historyItem.outputText));
  }

  filteredHistory = filteredHistory
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) // Sort by newest first
    .slice((page - 1) * 5, page * 5); // Paginate the sorted data

  const handleCopyHistory = (historyItem) => {
    setInputText(historyItem.inputText);
    setOutputText(historyItem.outputText);
    setInputLanguage(historyItem.inputLanguage);
    setOutputLanguage(historyItem.outputLanguage);
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div>
      {/* Search elements */}
      <Box className={classes.searchContainer}>
        <TextField
          className={classes.searchField}
          label="Language Filter"
          value={languageFilter}
          onChange={(e) => setLanguageFilter(e.target.value)}
        />
        <TextField
          className={classes.searchField}
          label="Day Filter"
          type="date"
          value={dayFilter}
          onChange={(e) => setDayFilter(e.target.value)}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <TextField
          className={classes.searchField}
          label="Search"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Box>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredHistory.map((historyItem) => (
          <Card key={historyItem.id} className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h6">
                Input Language: {historyItem.inputLanguage}
              </Typography>
              <Typography variant="h6">
                Output Language: {historyItem.outputLanguage}
              </Typography>
              <Typography variant="body1">
                Input Text: {historyItem.inputText.substring(0, 10)}
              </Typography>
              <Typography variant="body1">
                Output Text: {historyItem.outputText.substring(0, 10)}
              </Typography>
              <Typography variant="body2">
                Created At: {new Date(historyItem.createdAt).toLocaleString()}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <IconButton onClick={() => handleDelete(historyItem.id)} className={classes.deleteButton}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleCopyHistory(historyItem)} className={classes.copyButton}>
                <FileCopyIcon /> <Typography variant="body2">Copy to Editors</Typography>
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
      <div className={classes.pagination}>
        <Pagination
          count={Math.ceil(data.histories.length / 5)}
          page={page}
          onChange={onPageChange}
          color="primary"
          shape="rounded"
          variant="outlined"
          size="large"
          boundaryCount={2}
          showFirstButton
          showLastButton
          prevIcon={<ArrowBackIcon />}
          nextIcon={<ArrowForwardIcon />}
        />
      </div>
    </div>
  );
};

export default HistoryForm;
