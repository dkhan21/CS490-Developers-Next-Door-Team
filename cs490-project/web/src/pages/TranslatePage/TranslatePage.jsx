import { useState, useRef, useEffect, forwardRef } from 'react';
import { Button, IconButton, makeStyles, Box, CircularProgress, MenuItem, Select, InputLabel } from '@material-ui/core';
import { FileCopy as FileCopyIcon, FileUpload as FileUploadIcon, FileDownload as FileDownloadIcon, WidthFull } from '@mui/icons-material';
import { CheckCircle, HighlightOff } from '@material-ui/icons';
import saveAs from 'file-saver';
import MonacoEditor from '@monaco-editor/react';
//import detectLang from 'lang-detector'; If we want to add an auto-detect language feature
import Navbar from 'src/components/Navbar/Navbar'
import FeedbackForm from 'src/components/FeedbackForm';
import { Metadata } from '@redwoodjs/web';


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
}));

const languageToFileExtension = {
  java: 'java',
  python: 'py',
  cpp: 'cpp',
  c: 'c',
  javascript: 'js',
};
const MonacoEditorWrapper = forwardRef((props, ref) => {
  return <MonacoEditor {...props} ref={ref} />;
});

const TranslatePage = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('java');
  const [outputLanguage, setOutputLanguage] = useState('python');
  const [loading, setLoading] = useState(false); // State to control loading visibility
  const inputFile = useRef(null);
  const inputEditor = useRef(null);
  const outputEditor = useRef(null);
  const selectRef = useRef(null);

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

  const [isStatus500, setisStatus500] = useState(false);


  const handleConvertClick = () => {
    if (inputText.trim() === '') {
      addError("- No input text to convert")
      return false;;
    }
    setLoading(true); // Show loading element
    resetErrorState();
    let timeoutId; // Initialize timeout variable
    setisStatus500(false);

    const timeoutPromise = new Promise((resolve, reject) => {
      timeoutId = setTimeout(() => {
        if (!isStatus500) {
          addError("- API rate limit reached. Please try again later.");
          setIsGreen(false);
        }
      }, 4000); // Set timeout to 4 seconds
    });

    const dataPayload = {
      "messages": [
        {
          "role": "system",
          "content": inputText,
          "source": inputLanguage,
          "target": outputLanguage
        }
      ]
    };

    fetch('http://localhost:8910/.redwood/functions/openai', {
      mode: 'cors',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataPayload)
    })

      .then(response => {
        if (response.ok) {
          setIsGreen(true);
          console.log(response)
          return response.json();
        }
        else {
          if (response.status === 500) {
            setIsGreen(false);
            setisStatus500(true);
            addError("API Currently Down")
          } else {
            console.log(response)
            addError(response.statusText)
          }
        }
      })
      .then(data => {
        clearTimeout(timeoutId);
        setOutputText(data.completion);
      })
    setTimeout(() => {
      //If we want to add auto-detect feature: const detectedLanguage = detectLang(inputText)
      setLoading(false);
    }, 2000);
  };


  const handleInputLanguageChange = (e) => {
    if (outputLanguage === e.target.value) {
      setInputLanguage(e.target.value);
      setOutputLanguage(inputLanguage);
    }
    else {
      setInputLanguage(e.target.value);
    }
  };

  const handleOutputLanguageChange = (e) => {
    if (inputLanguage === e.target.value) {
      setOutputLanguage(e.target.value);
      setInputLanguage(outputLanguage);
    }
    else {
      setOutputLanguage(e.target.value);
    }
  };

  const handleDownloadClick = () => {
    if (inputText.trim() === '') {
      addError("- No input text to download")
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
      addError("- Unsupported File Uploaded")
      return;
    }
  };

  const handleCopyClick = () => {
    if (inputText.trim() === '') {
      addError("- No input text to copy")
      return;
    }
    navigator.clipboard.writeText(inputText);
  };

  const handleOutputCopyClick = () => {
    if (outputText.trim() === '') {
      addError("- No output text to copy")
      return;
    }
    navigator.clipboard.writeText(outputText);
  };

  const handleOutputDownloadClick = () => {
    if (outputText.trim() === '') {
      addError("- No output text to download")
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

  const [errorFound, setErrorFound] = useState(false);
  const [errors, setErrors] = useState([]);

  const resetErrorState = () => {
    setErrorFound(false);
    setErrors([]);
  };

  const addError = (error) => {
    resetErrorState();
    setErrorFound(true);
    setErrors(prevErrors => [...prevErrors, error]);
  };


  return (
    <>
      <Metadata title="Translate" description="Translate" />
      <header>
        <Navbar />
      </header>
      <div className={classes.page} >
        <div className={classes.convertContainer}>
          <div className={classes.editorContainer}>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleUploadClick}
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
                <Select value={inputLanguage} onChange={handleInputLanguageChange} style={{ color: '#fff' }}
                  aria-label='input-language-dropdown'
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#393e41', // background color of the dropdown menu
                      },
                    },
                    MenuListProps: {
                      style: {
                        color: '#fff', // text color of the dropdown items
                        textAlign: 'center', // center the text in the dropdown
                      },
                    },
                  }}>
                  <MenuItem value={'java'}>Java</MenuItem>
                  <MenuItem value={'python'}>Python</MenuItem>
                  <MenuItem value={'c'}>C</MenuItem>
                  <MenuItem value={'cpp'}>C++</MenuItem>
                  <MenuItem value={'javascript'}>JavaScript</MenuItem>
                </Select>
              </div>
              <MonacoEditorWrapper
                forwardedRef={inputEditor}
                name="inputEditor"
                height="535px"
                width="550px"
                options={{
                  fontSize: 14,
                  scrollBeyondLastLine: false,
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
              style={{ backgroundColor: '#1e1e1e', color: '#fff', padding: '5px', borderRadius: '10px', width: 'fit-content' }}>
              GPT-3 Status
              <IconButton onClick={handleToggleColor}>
                {isGreen ? <CheckCircle style={{ color: 'green' }} /> : <HighlightOff style={{ color: 'red' }} />}
              </IconButton>
            </Box>

            {errorFound ? <Box
              boxShadow={3}
              style={{ backgroundColor: '#1e1e1e', color: 'red', padding: '5px', marginTop: '5px', borderRadius: '10px', width: 'fit-content' }}>Error:
              {errors.map((error, indexErr) => (
                <p key={indexErr}>{error}</p>
              ))}
            </Box> : null}


            <Button
              variant="contained"
              className={classes.convertButton}
              onClick={handleConvertClick}
            >Convert
            </Button>
            {loading && <CircularProgress style={{ color: 'white', marginTop: '10px' }} />}
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
                <Select value={outputLanguage} onChange={handleOutputLanguageChange} style={{ color: '#fff' }}
                  aria-label='output-language-dropdown'
                  MenuProps={{
                    PaperProps: {
                      style: {
                        backgroundColor: '#393e41', // background color of the dropdown menu
                      },
                    },
                    MenuListProps: {
                      style: {
                        color: '#fff', // text color of the dropdown items
                        textAlign: 'center', // center the text in the dropdown
                      },
                    },
                  }}>
                  <MenuItem value={'java'}>Java</MenuItem>
                  <MenuItem value={'python'}>Python</MenuItem>
                  <MenuItem value={'c'}>C</MenuItem>
                  <MenuItem value={'cpp'}>C++</MenuItem>
                  <MenuItem value={'javascript'}>JavaScript</MenuItem>
                </Select>
              </div>
              <MonacoEditorWrapper
                forwardedRef={outputEditor}
                height="535px"
                width="550px"
                options={{
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                }}
                language={outputLanguage}
                theme="vs-dark"
                onChange={setOutputText}
                value={outputText}
              />
            </div>
          </div>
        </div>
      </div>

      <FeedbackForm ></FeedbackForm>

    </>
  );
};
export default TranslatePage;