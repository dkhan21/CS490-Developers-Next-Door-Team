import React, { useState, useEffect } from 'react';
import { gql, useMutation, useQuery } from '@redwoodjs/web';
import { useAuth } from 'src/auth';
import { IconButton, Card, CardContent, Typography, CardActions, makeStyles, TextField, Box, Select, MenuItem  } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@mui/material/Pagination';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import { Toaster, toast } from '@redwoodjs/web/toast';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
  card: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
    marginRight: '20px',
    background: '#222',
    color: '#fff',
    border: '1px solid #444',
    borderRadius: '10px',
    boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.5)',
    width: '270px',
    height: '270px',
  },
  cardContent: {
    flex: '1 0 auto',
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
    flex: '0 0 auto',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
  },
  searchContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: '110px',
    marginBottom: '20px',
    marginTop: '20px',
  },
  searchField: {
    marginRight: '10px',
  },
  signInMessage: {
    paddingTop: '50px',
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

export const GET_USER_HISTORY_QUERY = gql`
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
  const [sortBy, setSortBy] = useState('newest');
  const { loading, error, data, refetch } = useQuery(GET_USER_HISTORY_QUERY);
  const [deleteHistory] = useMutation(DELETE_HISTORY_MUTATION, {
    refetchQueries: [{ query: GET_USER_HISTORY_QUERY }],
  });

  useEffect(() => { // For first entry
    if (data && data.histories && data.histories.length > 0) {
      setPage(1);
    }
  }, [data]);

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setPage(1);
  };

  const handleInputLanguageFilterChange = (e) => {
    const inputValue = e.target.value;
    setInputLanguageFilter(inputValue === 'C++' ? 'cpp' : inputValue);
    setPage(1);
  };

  const handleOutputLanguageFilterChange = (e) => {
    const outputValue = e.target.value;
    setOutputLanguageFilter(outputValue === 'C++' ? 'cpp' : outputValue);
    setPage(1);
  };

  const handleSearchTextChange = (text) => {
    setSearchText(text);
    setPage(1);
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

  if (!currentUser) {
    return (
      <Typography  variant="h1" className={classes.signInMessage}>
        You need to sign in to access your history.
      </Typography>
    );
  }
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  let filteredHistory = data.histories.filter((historyItem) => historyItem.userId === currentUser.id);

  if (inputLanguageFilter && inputLanguageFilter !== 'All') {
    filteredHistory = filteredHistory.filter((historyItem) => historyItem.inputLanguage === inputLanguageFilter.toLowerCase());
  }

  if (outputLanguageFilter && outputLanguageFilter !== 'All') {
    filteredHistory = filteredHistory.filter((historyItem) => historyItem.outputLanguage === outputLanguageFilter.toLowerCase());
  }

  if (startDate && endDate) {
    const startDateObj = new Date(startDate);
    const endDateObj = new Date(endDate);

    filteredHistory = filteredHistory.filter((historyItem) => {
      const historyDate = new Date(historyItem.createdAt);
      return historyDate >= startDateObj && historyDate <= endDateObj;
    });
  }

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

  if (sortBy === 'newest') {
    filteredHistory = filteredHistory.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }
  else if (sortBy === 'oldest') {
    filteredHistory = filteredHistory.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
  }
  else if (sortBy === 'shortest') {
    filteredHistory = filteredHistory
    .sort((a, b) => a.inputText.length - b.inputText.length)
  }
  else if (sortBy === 'longest') {
    filteredHistory = filteredHistory.sort((a, b) => b.inputText.length - a.inputText.length)
  }
  filteredHistory = filteredHistory.slice((page - 1) * 5, page * 5);

  return (
    <div> {}
      {/* Search elements */}
      <Box className={classes.searchContainer}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ color: 'white', marginRight: '25px', }}>Sort By</div>
          <Select
            className={classes.searchField}
            value={sortBy}
            onChange={handleSortByChange}
            style={{ color: '#fff' }}
            MenuProps={{
              PaperProps: {
                style: {
                  backgroundColor: '#393e41',
                },
              },
              MenuListProps: {
                style: {
                  color: '#fff',
                  textAlign: 'center',
                },
              },
            }}>
            <MenuItem value="newest">Newest</MenuItem>
            <MenuItem value="oldest">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <span>Oldest</span>
              </div>
            </MenuItem>
            <MenuItem value="shortest">Shortest</MenuItem>
            <MenuItem value="longest">Longest</MenuItem>
          </Select>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'white', marginRight: '25px', }}>Input Language</div>
            <Select
              className={classes.searchField}
              value={inputLanguageFilter}
              onChange={handleInputLanguageFilterChange}
              style={{ color: '#fff' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: '#393e41',
                  },
                },
                MenuListProps: {
                  style: {
                    color: '#fff',
                    textAlign: 'center',
                  },
                },
              }}
              displayEmpty>
              <MenuItem value="">All Languages</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="JavaScript">JavaScript</MenuItem>
            </Select>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ color: 'white', marginRight: '25px' }}>Output Language</div>
            <Select
              className={classes.searchField}
              value={outputLanguageFilter}
              onChange={handleOutputLanguageFilterChange}
              style={{ color: '#fff' }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: '#393e41',
                  },
                },
                MenuListProps: {
                  style: {
                    color: '#fff',
                    textAlign: 'center',
                  },
                },
              }}
              displayEmpty>
              <MenuItem value="">All Languages</MenuItem>
              <MenuItem value="Java">Java</MenuItem>
              <MenuItem value="Python">Python</MenuItem>
              <MenuItem value="C">C</MenuItem>
              <MenuItem value="cpp">C++</MenuItem>
              <MenuItem value="JavaScript">JavaScript</MenuItem>
            </Select>
        </div>
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
          <Card key={historyItem.id} className={classes.card} data-testid= 'history-card'>
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
                <strong>Status:</strong> {historyItem.status} {}
                </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <IconButton onClick={() => handleDelete(historyItem.id)} className={classes.deleteButton}>
                <DeleteIcon />
              </IconButton>
              <IconButton onClick={() => handleCopyHistory(historyItem)} className={classes.copyButton}>
                <FileCopyIcon /> <Typography variant="body2" style={{ fontSize: '1.0rem' }}>Copy to Editors</Typography>
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </div>
      <div className={classes.pagination}>
        <Pagination count={totalPages} page={page} onChange={onPageChange} color="primary"
          shape="rounded" variant="outlined" size="large"
          boundaryCount={2} showFirstButton
          showLastButton previcon={<ArrowBackIcon />} nexticon={<ArrowForwardIcon />}
        />
      </div>
    </div>
  );

};

export default HistoryForm;
