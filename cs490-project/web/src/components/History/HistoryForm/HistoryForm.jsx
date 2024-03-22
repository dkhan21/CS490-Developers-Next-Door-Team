import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@redwoodjs/web';
import { useAuth } from 'src/auth';
import { IconButton, Card, CardContent, Typography, CardActions, makeStyles, TextField, Box, FormLabel } from '@material-ui/core';
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
    maxWidth: '270px',
    maxHeight: '300px'
  },
  cardContent: {
    flexDirection: 'column',
  },

  deleteButton: {
    color: '#ff5555',
  },
  copyButton: {
    color: '#0066cc',
    fontSize: 'smaller',
    backgroundColor: 'transparent',
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
  signInMessage: {
    textAlign: 'center',
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#fff',
  },
  filterText: {
    textAlign: 'center',
    color: '#00f',
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
      status
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
  const [inputLanguageFilter, setInputLanguageFilter] = useState('');
  const [outputLanguageFilter, setOutputLanguageFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchText, setSearchText] = useState('');
  const classes = useStyles();

  const { loading, error, data, refetch } = useQuery(GET_USER_HISTORY_QUERY);

  const [deleteHistory] = useMutation(DELETE_HISTORY_MUTATION, {
    refetchQueries: [{ query: GET_USER_HISTORY_QUERY }],
  });

  useEffect(() => { // For first entry
    if (data && data.histories && data.histories.length > 0) {
      setPage(1);
    }
  }, [data]);

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

  const handleStartDateChange = (date) => {
    if (!endDate || new Date(date) <= new Date(endDate)) {
      setStartDate(date);
    } else {
      setStartDate(endDate);
      setEndDate(date);
    }
    setPage(1);
  };

  const handleEndDateChange = (date) => {
    if (!startDate || new Date(date) >= new Date(startDate)) {
      setEndDate(date);
    } else {
      setEndDate(startDate);
      setStartDate(date);
    }
    setPage(1);
  };

  if (!currentUser) {
    return (
      <Typography variant="h1" className={classes.signInMessage}>
        You need to sign in to access your history.
      </Typography>
    );
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  let filteredHistory = data.histories
    .filter((historyItem) => historyItem.userId === currentUser.id);

  const handleInputLanguageFilterChange = (e) => {
    setInputLanguageFilter(e.target.value);
    setPage(1); // Reset page to 1 when filter changes
  };
  
  const handleOutputLanguageFilterChange = (e) => {
    setOutputLanguageFilter(e.target.value);
    setPage(1); // Reset page to 1 when filter changes
  };
    
  if (inputLanguageFilter && inputLanguageFilter !== 'All') {
    filteredHistory = filteredHistory.filter((historyItem) => historyItem.inputLanguage.toLowerCase().includes(inputLanguageFilter.toLowerCase()));
  }

  if (outputLanguageFilter && outputLanguageFilter !== 'All') {
    filteredHistory = filteredHistory.filter((historyItem) => historyItem.outputLanguage.toLowerCase().includes(outputLanguageFilter.toLowerCase()));
  }

  if (startDate && endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);
  
    filteredHistory = filteredHistory.filter((historyItem) => {
      const historyDate = new Date(historyItem.createdAt);
      return historyDate >= startDateObj && historyDate <= endDateObj;
    });
  }
  const handleSearchTextChange = (text) => {
    setSearchText(text);
    setPage(1); // Reset page to 1 when search field changes
  };
  if (searchText) {
    const searchTextLowerCase = searchText.replace(/\n/g, '').toLowerCase();
    filteredHistory = filteredHistory.filter((historyItem) => {
      const inputTextLowerCase = historyItem.inputText.replace(/\n/g, '').toLowerCase();
      const outputTextLowerCase = historyItem.outputText.replace(/\n/g, '').toLowerCase();
      return (
        inputTextLowerCase.includes(searchTextLowerCase) ||
        outputTextLowerCase.includes(searchTextLowerCase)
      );
    });
  }

  const totalPages = Math.ceil(filteredHistory.length / 5);
  if (page > totalPages) {
    setPage(totalPages);
  }

  filteredHistory = filteredHistory
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice((page - 1) * 5, page * 5);

  const handleCopyHistory = (historyItem) => {
    setInputText(historyItem.inputText);
    setOutputText(historyItem.outputText);
    setInputLanguage(historyItem.inputLanguage);
    setOutputLanguage(historyItem.outputLanguage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="pa"> {/* Apply transition class to the wrapper */}
      {/* Search elements */}
      <Box className={classes.searchContainer}>
        <TextField
          className={classes.searchField}
          label="Input Language Filter"
          value={inputLanguageFilter}
          onChange={handleInputLanguageFilterChange}
          InputLabelProps={{
            shrink: true,
            style: { color: '#fff', fontSize: '1.25rem', justifyContent: 'end'}
          }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          className={classes.searchField}
          label="Output Language Filter"
          value={outputLanguageFilter}
          onChange={handleOutputLanguageFilterChange}
          InputLabelProps={{
            shrink: true,
            style: { color: '#fff', fontSize: '1.15rem' }
          }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          className={classes.searchField}
          label="Start Date"
          type="date"
          value={startDate}
          onChange={(e) => handleStartDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
            style: { color: '#fff', fontSize: '1.5rem' }
          }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          className={classes.searchField}
          label="End Date"
          type="date"
          value={endDate}
          onChange={(e) => handleEndDateChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
            style: { color: '#fff', fontSize: '1.5rem' }
          }}
          InputProps={{ style: { color: '#fff' } }}
        />
        <TextField
          className={classes.searchField}
          label="Search"
          value={searchText}
          onChange={(e) => handleSearchTextChange(e.target.value)}
          InputLabelProps={{
            shrink: true,
            style: { color: '#fff', fontSize: '1.5rem', }
          }}
          InputProps={{ style: { color: '#fff' } }}
        />
      </Box>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {filteredHistory.map((historyItem) => (
          <Card key={historyItem.id} className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="subtitle1" style={{ fontSize: '1.0rem' }}> {}
              <strong>Input Language:</strong> {historyItem.inputLanguage}
              </Typography>
              <Typography variant="subtitle1" style={{ fontSize: '1.0rem' }}> {}
              <strong>Output Language:</strong> {historyItem.outputLanguage}
              </Typography>
              <Typography variant="body2" style={{ fontSize: '0.8rem', whiteSpace: 'pre-wrap', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  <strong>Input Text:</strong> {historyItem.inputText.substring(0, 500).replace(/[\r\n]+/g, ' ')}
              </Typography>
            <Typography variant="body2" style={{  fontSize: '0.8rem', whiteSpace: 'pre-wrap',  overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'  }}>
            <strong>Output Text:</strong> {historyItem.outputText.substring(0, 500).replace(/[\r\n]+/g, ' ')}
              </Typography>
              <Typography variant="body2">
              <strong>Created At:</strong> {new Date(historyItem.createdAt).toLocaleString()}
              </Typography>
              <Typography variant="body2">
              <strong>Status:</strong> {historyItem.status} {/* Display the status here */}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <IconButton onClick={() => handleDelete(historyItem.id)} className={classes.deleteButton}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleCopyHistory(historyItem)} className={classes.copyButton}>
                <FileCopyIcon /> <Typography variant="body2" style={{ fontSize: '0.8rem' }}>Copy to Editors</Typography>
              </IconButton>
            </CardActions>
          </Card>

        ))}
      </div>
      <div className={classes.pagination}>
        <Pagination count={totalPages} page={page} onChange={onPageChange} color="primary"
          shape="rounded" variant="outlined" size="large"
          boundaryCount={2} showFirstButton
          showLastButton prevIcon={<ArrowBackIcon />} nextIcon={<ArrowForwardIcon />}
        />
      </div>
    </div>
  );
};

export default HistoryForm;
