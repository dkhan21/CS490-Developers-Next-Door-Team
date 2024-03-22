import { useState, useRef, useEffect, forwardRef } from 'react';
import { Button, IconButton, makeStyles, Box, CircularProgress, MenuItem, Select, InputLabel } from '@material-ui/core';
import { FileCopy as FileCopyIcon, FileUpload as FileUploadIcon, FileDownload as FileDownloadIcon, WidthFull } from '@mui/icons-material';
import { CheckCircle, HighlightOff } from '@material-ui/icons';
import saveAs from 'file-saver';
import MonacoEditor from '@monaco-editor/react';
//import detectLang from 'lang-detector'; If we want to add an auto-detect language feature
import Navbar from 'src/components/Navbar/Navbar'
import FeedbackForm from 'src/components/FeedbackForm';
import HistoryForm from 'src/components/History/HistoryForm';
import { Metadata } from '@redwoodjs/web';
import { useAuth } from 'src/auth';
import { gql, useMutation, useQuery } from '@redwoodjs/web';

const CREATE_HISTORY_MUTATION = gql`
  mutation CreateHistoryMutation($input: CreateHistoryInput!) {
    createHistory(input: $input) {
      id
    }
  }
`;

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

const useStyles = makeStyles((theme) => ({
  page: { // Container for entire page
    backgroundImage: 'linear-gradient(to right, #403c44, #3C3C44)', // Background gradient
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'fit-content',
    minHeight: '100vh',
  },
  dropdownContainer: { // Container for dropdown
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    '& .MuiSelect-icon': {
      color: '#32368c',
    },
  },
  convertContainer: { // Container for entire converter
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
    marginTop: '50px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    minWidth: 'fit-content',
    height: 'fit-content',
    },
  editorContainer: { // Container for editor, dropdown, and buttons
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '10px 10px 10px 0px rgba(0, 0, 0, 0.1)',
  },
  fieldContainer: { // Container for dropdown and editor
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: { // Container for 3 buttons
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
    marginLeft: '-10px',
    marginRight: '5px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { // Style for buttons
    backgroundColor: '#32368c',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
    width: '50px',
    height: '50px',
    borderRadius: '10px',
  },
  loadingContainer: { // Container GPT-3 Status, convert button, and loading
    display: 'flex',
    flexDirection: 'column',
    height: '605px',
    width: '156px',
    alignItems: 'center',
  },
  convertButton: { // Style for convert button
    backgroundColor: '#32368c',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
    width: 'fit-content',
    height: '50px',
    borderRadius: '10px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '150%',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add subtle shadow
    transition: 'background-color 0.3s ease', // Smooth transition on hover
  },
  uploadButtonDragOver: {
  backgroundColor: '#536dfe', // Change the background color to indicate drag over
},
}));

const languageToFileExtension = {
  'Java': 'java',
  'Python': 'py',
  'C++': 'cpp',
  'C': 'c',
  'JavaScript': 'js',
};
const MonacoEditorWrapper = forwardRef((props, ref) => {
  return <MonacoEditor {...props} ref={ref} />;
});

const TranslatePage = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [inputLanguage, setInputLanguage] = useState('Java');
  const [outputLanguage, setOutputLanguage] = useState('Python');
  const [loading, setLoading] = useState(false); // State to control loading visibility
  const inputFile = useRef(null);
  const inputEditor = useRef(null);
  const outputEditor = useRef(null);
  const { currentUser } = useAuth();
  const [createHistory, { loading: saving, error: saveError }] = useMutation(CREATE_HISTORY_MUTATION, {
    onCompleted: () => {
      refetch;
    },
    onError: (error) => {
      alert("Could not create history entry.");
    },
  });
  const { loading: histoyLoading, error: historyError, data, refetch } = useQuery(GET_USER_HISTORY_QUERY);
  
  useEffect(() => {
    if (inputEditor.current) {
      monaco.editor.setModelLanguage(inputEditor.current.getModel(), inputLanguage.toLowerCase());
    }
  }, [inputLanguage]);

  useEffect(() => {
    if (outputEditor.current) {
      monaco.editor.setModelLanguage(outputEditor.current.getModel(), outputLanguage.toLowerCase());
    }
  }, [outputLanguage]);

  const handleConvertClick = () => {
    if (inputText.trim() === '') {
      alert('Please provide input text before converting.');
      return;
    }
    setLoading(true);
    const generatedOutputText = generateOutputText(inputText);  
    setTimeout(() => {
      setLoading(false);
      let stat = "Not Translated";
      setOutputText(generatedOutputText);
      if(generatedOutputText.length > 0){
        stat = "Successfully Translated";
      }
      createHistory({
        variables: {
          input: {
            inputLanguage,
            outputLanguage,
            inputText,
            outputText: generatedOutputText,
            userId: currentUser.id,
            status: stat
          },
        },
      }).then(() => {
        refetch();
        setPage(1);
      }).catch((error) => {
        console.error('Error creating history:', error);
      });
    }, 2000);
  };
  
  const generateOutputText = (inputText) => {
    return inputText;
  };
  
  const handleInputLanguageChange = (e) => {
    if(outputLanguage === e.target.value){
      setInputLanguage(e.target.value);
      setOutputLanguage(inputLanguage);
    }
    else{
      setInputLanguage(e.target.value);
    }
  };

  const handleOutputLanguageChange = (e) => {
    if(inputLanguage === e.target.value){
      setOutputLanguage(e.target.value);
      setInputLanguage(outputLanguage);
    }
    else{
      setOutputLanguage(e.target.value);
    }
  };

  const handleDownloadClick = () => {
    if (inputText.trim() === '') {
      alert('There is no input to download.');
      return;
    }
    const fileExtension = languageToFileExtension[inputLanguage];
    const fileName = `input.${fileExtension}`;
    const blob = new Blob([inputText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
  };

  const handleUploadClick = () => {
    inputFile.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop(); // Extract file extension
    const supportedLanguages = Object.values(languageToFileExtension);

    if (supportedLanguages.includes(fileExtension)) {
      const language = Object.keys(languageToFileExtension).find(
        key => languageToFileExtension[key] === fileExtension
      );
      setInputLanguage(language);

      const reader = new FileReader();
      reader.onload = () => {
        setInputText(reader.result);
      };
      reader.readAsText(file);
    } else {
      alert('File extension unsupported.');
    }
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(inputText);
  };

  const handleOutputCopyClick = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleOutputDownloadClick = () => {
    if (outputText.trim() === '') {
      alert('There is no output to download.');
      return;
    }
    const fileExtension = languageToFileExtension[outputLanguage];
    const fileName = `output.${fileExtension}`;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
  };

  const [isGreen, setIsGreen] = useState(true);
  const handleToggleColor = () => {
    setIsGreen(prevState => !prevState);
  };

const [isDragOver, setIsDragOver] = useState(false);

const handleDragOver = (e) => {
  e.preventDefault();
  setIsDragOver(true); 
};

const handleDragLeave = () => {
  setIsDragOver(false);
};

const handleDrop = (e) => {
  e.preventDefault();
  setIsDragOver(false);
  const file = e.dataTransfer.files[0];
  handleFileChange({ target: { files: [file] } });
};


  return (
    <>
    <Metadata title="Translate" description="Translate" />
      <header>
        <Navbar/>
      </header>
      <div className={classes.page} >
        <div className={classes.convertContainer}>
          <div className={classes.editorContainer}>
            <div className={classes.buttonContainer}>
            <Button
                variant="contained"
                className={`${classes.button} ${isDragOver ? classes.uploadButtonDragOver : ''}`}
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              ><FileUploadIcon fontSize="large" />
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleDownloadClick}
              ><FileDownloadIcon fontSize="large" />
              </Button>
              <Button
                aria-label="copy-button"
                variant="contained"
                className={classes.button}
                onClick={handleCopyClick}
              ><FileCopyIcon fontSize="large" />
              </Button>
              <input
                type="file"
                ref={inputFile}
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
            </div>
            <div className={classes.fieldContainer}>
              <div className={classes.dropdownContainer}>
                  <Select  value={inputLanguage}  onChange={handleInputLanguageChange}  style={{color:'#fff' }}
                  aria-label='input-language-dropdown'
                    MenuProps={{
                      PaperProps: {
                        style: {
                          backgroundColor: '#393e41', // background color of the dropdown menu
                        },
                      },
                      MenuListProps: {
                        style: {
                          color: '#fff',
                          textAlign: 'center',
                        },
                      },
                    }}>
                    <MenuItem value={'Java'}>Java</MenuItem>
                    <MenuItem value={'Python'}>Python</MenuItem>
                    <MenuItem value={'C'}>C</MenuItem>
                    <MenuItem value={'C++'}>C++</MenuItem>
                    <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
                  </Select>
              </div>
              <MonacoEditorWrapper
                forwardedRef={inputEditor}
                name="inputEditor"
                height="535px"
                width="550px"
                options={{
                  fontSize: 14,
                  scrollBeyondLastLine : false,
                }}
                language={inputLanguage}
                theme="vs-dark"
                onChange={setInputText}
                value={inputText}
              />
            </div>
          </div>
          <div className={classes.loadingContainer}>
          <Box
            display="flex"
            alignItems="center"
            boxShadow={3}
            style={{backgroundColor: '#1e1e1e', color: '#fff', padding: '5px', borderRadius: '10px', width: 'fit-content' }}>
            GPT-3 Status
            <IconButton onClick={handleToggleColor}>
              {isGreen ? <CheckCircle style={{ color: 'green' }} /> : <HighlightOff style={{ color: 'red' }} />}
            </IconButton>
          </Box>
          <Button
            variant="contained"
            className={classes.convertButton}
            onClick={handleConvertClick}
            disabled={loading}
          >Convert
          </Button>
          {loading && <CircularProgress style={{ color: 'white', marginTop: '10px'}} />}
          </div>
          <div className={classes.editorContainer}>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleOutputDownloadClick}>
                <FileDownloadIcon fontSize="large" />
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleOutputCopyClick}
              ><FileCopyIcon fontSize="large" />
              </Button>
            </div>
            <div className={classes.fieldContainer}>
              <div className={classes.dropdownContainer}>
                <Select  value={outputLanguage}  onChange={handleOutputLanguageChange}  style={{color:'#fff' }}
                aria-label='output-language-dropdown'
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#393e41', // background color of the dropdown menu
                      },
                    },
                    MenuListProps: {
                      style: {
                        color: '#ffffff',
                        textAlign: 'center',
                      },
                    },
                  }}>
                  <MenuItem value={'Java'}>Java</MenuItem>
                  <MenuItem value={'Python'}>Python</MenuItem>
                  <MenuItem value={'C'}>C</MenuItem>
                  <MenuItem value={'C++'}>C++</MenuItem>
                  <MenuItem value={'JavaScript'}>JavaScript</MenuItem>
                </Select>
              </div>
              <MonacoEditorWrapper
                forwardedRef={outputEditor}
                height="535px"
                width="550px"
                options={{
                  fontSize: 14,
                  scrollBeyondLastLine : false,
                }}
                language={outputLanguage}
                theme="vs-dark"
                onChange={setOutputText}
                value={outputText}
              />
            </div>
          </div>
        </div>
        <HistoryForm setInputText={setInputText} setOutputText={setOutputText} setInputLanguage={setInputLanguage} setOutputLanguage={setOutputLanguage}/>
      </div>
      <FeedbackForm ></FeedbackForm>
    </>
  );
};
export default TranslatePage;