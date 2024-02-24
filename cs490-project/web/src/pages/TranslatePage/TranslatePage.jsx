import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { useState, useRef } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CssBaseline from '@material-ui/core/CssBaseline';
import AceEditor from 'react-ace';
import { saveAs } from 'file-saver';

import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

// Maybe add dropdown to let user select theme
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_dark';
import 'brace/theme/tomorrow';
import 'brace/theme/twilight';
import 'brace/theme/xcode';

/*
INSTALLS IN TERMINAL:
yarn add @material-ui/core
yarn add @material-ui/icons
yarn add react-ace brace
yarn add file-saver
yarn add @mui/icons-material @mui/material @emotion/styled @emotion/react
*/

const useStyles = makeStyles((theme) => ({
  page: { // Container for entire converter
    backgroundColor: '#f0ecec',
    display: 'flex',
    flexDirection: 'row',
    gap: '10px', 
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px', 
  },
  editorContainer: { // Container for editor, dropdown, and buttons
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'row',
  },
  fieldContainer: { // Container for dropdown and editor
    display: 'flex',
    flexDirection: 'column',
  },
  dropdownContainer: { // Container for dropdown
    marginBottom: '10px',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
    flexDirection: 'column',
  },
  buttonContainer: { // Container for 3 buttons
    gridColumn: 'span 1', 
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginRight: '10px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  convertContainer: { // Container for convert button
    gridColumn: 'span 1', 
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: { // Style for buttons
    backgroundColor: '#3f51b5',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#303f9f',
    },
    width: '50px',
    height: '50px',
    borderRadius: '100px',
    fontSize: '1',
    marginBottom: '10px',
  }
}));

const languageToFileExtension = {
  java: 'java',
  python: 'py',
  c_cpp: 'cpp',
};

const TranslatePage = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('java');
  const [outputLanguage, setOutputLanguage] = useState('python');
  const inputFile = useRef(null);

  const handleConvertClick = () => {
    setOutputText(inputText);
  };

  const handleInputLanguageChange = (e) => {
    setInputLanguage(e.target.value);
  };

  const handleOutputLanguageChange = (e) => {
    setOutputLanguage(e.target.value);
  };

  const handleDownloadClick = () => {
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
    const reader = new FileReader();
    reader.onload = () => {
      setInputText(reader.result);
    };
    reader.readAsText(file);
  };

  const handleCopyClick = () => {
    navigator.clipboard.writeText(inputText);
  };

  const handleOutputCopyClick = () => {
    navigator.clipboard.writeText(outputText);
  };

  const handleOutputDownloadClick = () => {
    const fileExtension = languageToFileExtension[outputLanguage];
    const fileName = `output.${fileExtension}`;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, fileName);
  };

  return (
    <>
      <CssBaseline />
      <Metadata title="Translate" description="Translate page" />

      <h1>Translate Page</h1>
      <p>
        <Link to={routes.home()}>Home</Link>
      </p>
      <div className={classes.page}>
        <div className={classes.editorContainer}>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleUploadClick}
            >
              <FileUploadIcon />
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleDownloadClick}
            >
              <FileDownloadIcon />
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleCopyClick}
            >
              <FileCopyIcon />
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
              <Select value={inputLanguage} onChange={handleInputLanguageChange}>
                <MenuItem value={'java'}>Java</MenuItem>
                <MenuItem value={'python'}>Python</MenuItem>
                <MenuItem value={'c_cpp'}>C++</MenuItem>
              </Select>
            </div>
            <AceEditor
              className={classes.editor}
              mode={inputLanguage}
              theme="tomorrow"
              onChange={setInputText}
              value={inputText}
              name="input-editor"
            />
          </div>
        </div>
        <div className={classes.convertContainer}>
          <Button variant="contained" color="primary" onClick={handleConvertClick}>
            Convert
          </Button>
        </div>
        <div className={classes.editorContainer}>
          <div className={classes.buttonContainer}>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleOutputDownloadClick}
            >
              <FileDownloadIcon />
            </Button>
            <Button
              variant="contained"
              className={classes.button}
              onClick={handleOutputCopyClick}
            >
              <FileCopyIcon />
            </Button>
          </div>
          <div className={classes.fieldContainer}>
            <div className={classes.dropdownContainer}>
              <Select value={outputLanguage} onChange={handleOutputLanguageChange}>
                <MenuItem value={'java'}>Java</MenuItem>
                <MenuItem value={'python'}>Python</MenuItem>
                <MenuItem value={'c_cpp'}>C++</MenuItem>
              </Select>
            </div>
            <AceEditor
              className={classes.editor}
              mode={outputLanguage}
              theme="tomorrow"
              onChange={setOutputText}
              value={outputText}
              name="output-editor"
              editorProps={{ $blockScrolling: true }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
export default TranslatePage;
