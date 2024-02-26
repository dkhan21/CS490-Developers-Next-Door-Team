import { useState, useRef, useEffect } from 'react';
import { Button, Paper, Select, MenuItem, makeStyles, Box, Typography, IconButton, CssBaseline } from '@material-ui/core';
import { FileCopy as FileCopyIcon, FileUpload as FileUploadIcon, FileDownload as FileDownloadIcon, WidthFull } from '@mui/icons-material';
import { CheckCircle, HighlightOff } from '@material-ui/icons';
import saveAs from 'file-saver';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';

/*
INSTALLS IN TERMINAL:
yarn add @material-ui/core
yarn add @material-ui/icons
yarn add @monaco-editor/react @monaco-editor/loader
yarn add file-saver
yarn add @mui/icons-material @mui/material @emotion/styled @emotion/react
yarn add react-monaco-editor
npm install monaco-editor-webpack-plugin
*/

const useStyles = makeStyles((theme) => ({
  page: { // Container for entire page
    backgroundImage: 'linear-gradient(to right, #302c2c, #1e1e1e)', // Background gradient
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'fit-content',
    minHeight: '100vh',
  },
  convertContainer: { // Container for entire converter
    display: 'flex',
    flexDirection: 'row',
    gap: '10px',
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
    width: '100vrm',
    boxShadow: '10px 10px 10px 0px rgba(0, 0, 0, 0.1)',
  },
  fieldContainer: { // Container for dropdown and editor
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dropdownContainer: { // Container for dropdown
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center', // Center the text in the dropdown
    '& .MuiSelect-icon': {
      color: '#32368c', // Brighter arrow color
    },
  },
  buttonContainer: { // Container for 3 buttons 
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
    marginLeft: '-5px',
    marginRight: '0px',
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
  convertButton: { // Style for conver button
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
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add subtle shadow
    transition: 'background-color 0.3s ease', // Smooth transition on hover
  },
}));

const languageToFileExtension = {
  java: 'java',
  python: 'py',
  cpp: 'cpp',
};

const TranslatePage = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('java');
  const [outputLanguage, setOutputLanguage] = useState('python');
  const inputFile = useRef(null);
  const inputEditor = useRef(null);
  const outputEditor = useRef(null);

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
    setOutputText(inputText);
  };

  const handleInputLanguageChange = (e) => {
    setInputLanguage(e.target.value);
  };

  const handleOutputLanguageChange = (e) => {
    setOutputLanguage(e.target.value);
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

  return (
    <>
      <CssBaseline />
      <div className={classes.page}>
        <Paper elevation={3} style={{ backgroundColor: '#1e1e1e', color: '#fff', padding: '5px', borderRadius: '10px', width: 'fit-content', marginTop: '10px' }}>
          <Box display="flex" alignItems="center">
            <Typography variant="body1">GPT-3 Status</Typography>
            <IconButton onClick={handleToggleColor}>
              {isGreen ? <CheckCircle style={{ color: 'green' }} /> : <HighlightOff style={{ color: 'red' }} />}
            </IconButton>
          </Box>
        </Paper>
        <div className={classes.convertContainer}>
          <div className={classes.editorContainer}>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleUploadClick} 
              >
                <FileUploadIcon fontSize="large" />
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleDownloadClick}
              >
                <FileDownloadIcon fontSize="large" />
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleCopyClick}
              >
                <FileCopyIcon fontSize="large" />
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
                <Select value={inputLanguage} onChange={handleInputLanguageChange} style={{color:'#fff'}}>
                  <MenuItem value={'java'}>Java</MenuItem>
                  <MenuItem value={'python'}>Python</MenuItem>
                  <MenuItem value={'cpp'}>C++</MenuItem>
                </Select>
              </div>
              <Editor
                ref={inputEditor}
                height="535px"
                width="550px"
                options={{
                  fontSize: 12,
                  scrollBeyondLastLine : false,
                  minimap : {enabled: false}
                  
                }}
                language={inputLanguage}
                theme="vs-light"
                onChange={setInputText}
                value={inputText}
                loading={<div>Loading...</div>}
              />
            </div>
          </div>
          <Button
              variant="contained"
              className={classes.convertButton}
              onClick={handleConvertClick}
            >
              Convert
          </Button>
          <div className={classes.editorContainer}>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleOutputDownloadClick}
              >
                <FileDownloadIcon fontSize="large" />
              </Button>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleOutputCopyClick}
              >
                <FileCopyIcon fontSize="large" />
              </Button>
            </div>
            <div className={classes.fieldContainer}>
              <div className={classes.dropdownContainer}>
                <Select value={outputLanguage} onChange={handleOutputLanguageChange} style={{color:'#fff'}}>
                  <MenuItem value={'java'}>Java</MenuItem>
                  <MenuItem value={'python'}>Python</MenuItem>
                  <MenuItem value={'cpp'}>C++</MenuItem>
                </Select>
              </div>
              <Editor
                ref={outputEditor}
                height="535px"
                width="550px"
                options={{
                  readOnly: true,
                  fontSize: 12,
                  scrollBeyondLastLine : false,
                  minimap : {enabled: false}
                }}
                language={outputLanguage}
                theme="vs-dark"
                onChange={setOutputText}
                value={outputText}
                loading={<div>Loading...</div>}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default TranslatePage;