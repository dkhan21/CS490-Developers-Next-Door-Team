import { useState, useRef, useEffect, forwardRef } from 'react'
import {
  Button,
  IconButton,
  makeStyles,
  Box,
  CircularProgress,
  MenuItem,
  Select,
  InputLabel,
} from '@material-ui/core'
import {
  FileCopy as FileCopyIcon,
  FileUpload as FileUploadIcon,
  FileDownload as FileDownloadIcon,
  WidthFull,
  Start,
} from '@mui/icons-material'
import { CheckCircle, HighlightOff } from '@material-ui/icons'
import FeedbacksCell from 'src/components/FeedbacksCell';

import saveAs from 'file-saver'
import MonacoEditor from '@monaco-editor/react'
//import detectLang from 'lang-detector'; If we want to add an auto-detect language feature
import Navbar from 'src/components/Navbar/Navbar'
import FeedbackForm from 'src/components/FeedbackForm'
import { Metadata } from '@redwoodjs/web'
import HistoryForm from 'src/components/History/HistoryForm'
import { useAuth } from 'src/auth'
import { gql, useMutation, useQuery } from '@redwoodjs/web'
import hljs from 'highlight.js'
import * as monaco from 'monaco-editor';


const apikey = process.env.OPENAI_API_KEY
//import { cookieName } from 'src/lib/auth';

const CREATE_HISTORY_MUTATION = gql`
  mutation CreateHistoryMutation($input: CreateHistoryInput!) {
    createHistory(input: $input) {
      id
      inputLanguage
      outputLanguage
      inputText
      outputText
      status
      createdAt
      userId
    }
  }
`

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
`

const GET_USER_HISTORY_COUNTS = gql`
  query GetUserHistoryCounts($id: Int!) {
    historyCount(id: $id)
  }
`

const useStyles = makeStyles((theme) => ({
  detect: {
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
  page: {
    // Container for entire page
    backgroundImage: 'linear-gradient(to right, #403c44, #3C3C44)', // Background gradient
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'fit-content',
    minHeight: '100vh',
  },
  dropdownContainer: {
    // Container for dropdown
    backgroundColor: '#44bba4',
    borderRadius: '10px',
    padding: '10px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    textAlign: 'center',
    '& .MuiSelect-icon': {
      color: '#32368c',
    },
    '&:hover': {
      backgroundColor: '#e7bb41',
    },
  },
  convertContainer: {
    // Container for entire converter
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
  editorContainer: {
    // Container for editor, dropdown, and buttons
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '10px 10px 10px 0px rgba(0, 0, 0, 0.1)',
  },
  fieldContainer: {
    // Container for dropdown and editor
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  buttonContainer: {
    // Container for 3 buttons
    display: 'flex',
    flexDirection: 'column',
    gap: '50px',
    marginLeft: '-10px',
    marginRight: '5px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    // Style for buttons
    backgroundColor: '#44bba4',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#e7bb41',
    },
    width: '50px',
    height: '50px',
    borderRadius: '10px',
  },
  loadingContainer: {
    // Container GPT-3 Status, convert button, and loading
    display: 'flex',
    flexDirection: 'column',
    height: '605px',
    width: '156px',
    alignItems: 'center',
  },
  convertButton: {
    // Style for convert button
    backgroundColor: '#44bba4',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#e7bb41',
    },
    width: 'fit-content',
    height: '50px',
    borderRadius: '10px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    marginTop: '103%', //Change this to move the CONVERT BUTTON UP OR DOWN
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Add subtle shadow
    transition: 'background-color 0.3s ease', // Smooth transition on hover
  },
  uploadButtonDragOver: {
    backgroundColor: '#536dfe', // Change the background color to indicate drag over
  },
}))

const languageToFileExtension = {
  java: 'java',
  python: 'py',
  cpp: 'cpp',
  c: 'c',
  javscript: 'js',
}
const MonacoEditorWrapper = forwardRef((props, ref) => {
  return <MonacoEditor {...props} ref={ref} />
})

const TranslatePage = () => {
  const classes = useStyles()
  const [inputText, setInputText] = useState('')
  const [outputText, setOutputText] = useState('')
  const [inputLanguage, setInputLanguage] = useState('java')
  const [outputLanguage, setOutputLanguage] = useState('python')
  const [loading, setLoading] = useState(false) // State to control loading visibility
  const inputFile = useRef(null)
  const inputEditor = useRef("paste")
  const outputEditor = useRef("paste")
  const { isAuthenticated, currentUser, getToken } = useAuth()

  const [activeTranslations, setActiveTranslations] = useState(0)
  const [token, setToken] = useState(null)



  //Feedback code to the Translate page
  const handleCopyToEditors = (inText, outText, inLan, outLan) => {
    setInputText(inText);
    setOutputText(outText);
    setInputLanguage(inLan);
    setOutputLanguage(outLan);
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  };

  const returnToken = async () => {
    try {
      const tokenVal = await getToken()
      setToken(tokenVal)
    } catch (error) {
      console.error('Error getting token:', error)
    }
  }

  useEffect(() => {
    returnToken()
  })

  const [createHistory] = useMutation(CREATE_HISTORY_MUTATION, {
    onCompleted: () => {
      refetch()
    },
    onError: (error) => {
      alert('Could not create history entry.')
    },
  })

  const {
    loading: histoyLoading,
    error: historyError,
    data,
    refetch,
  } = useQuery(GET_USER_HISTORY_QUERY)

  let translationCount = -1
  let hRecount

  try {
    const {
      loading: loadings,
      error: err,
      data: counts,
      refetch: recount,
    } = useQuery(GET_USER_HISTORY_COUNTS, { variables: { id: currentUser.id } })
    if (err) {
      console.log('History counts error: ' + err)
    }
    translationCount = counts['historyCount']
    hRecount = recount
  } catch (error) {
    //console.log("Not logged in")
  }

  /*
  if(!loadings){
    console.log("Translation count: " + counts["historyCount"])
  }
  */
  
  useEffect(() => {
    // Perform actions that depend on the editors being available
    console.log('Both editors are mounted and available for use.');

    // Example: Setting the language model when the language state changes
    monaco.editor.setModelLanguage(inputEditor.current.getModel(), inputLanguage.toLowerCase());
    monaco.editor.setModelLanguage(outputEditor.current.getModel(), outputLanguage.toLowerCase());

  // Optional: Cleanup logic if needed when the component unmounts
  return () => {
    // Cleanup tasks, if any
  };
}, [inputLanguage, outputLanguage]);  // Dependencies on language states if they affect editor setup


  const [isStatus500, setisStatus500] = useState(false)

  const [isStatus401, setisStatus401] = useState(false)

  const [LanFound, setLanfound] = useState(false)
  const languages = ['java', 'python', 'javascript', 'c', 'cpp']
  //Detect the language the text is in

  const [detect, setDetected] = useState(false)

  const handleDetect = () => {
  return new Promise((resolve, reject) => {
    if (activeTranslations >= 3) {
      addError('- Too many requests');
      reject(new Error('Too many requests'));
      return;
    }
    if (inputText.trim() === '') {
      addError('- No input text to convert');
      reject(new Error('No input text to convert'));
      return;
    }

    try {
      const dataPayload2 = {
        messages: [{
          role: 'system',
          content: inputText,
          source: inputLanguage,
          target: outputLanguage,
          promptNum: 2,
        }],
      };

      fetch('https://codeharbordnd.netlify.app/.netlify/functions/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPayload2),
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
            if (data && data.completion) {
                const lan = data.completion.toLowerCase()
                if (languages.includes(lan)) {
                    console.log(lan + ' found')
                    if (outputLanguage === lan) {
                        setOutputLanguage(inputLanguage)
                    }
                    setInputLanguage(lan)
                    setInputLanguage(lan) // This line seems redundant
                    setLanfound(true)
                    setDetected(false)
                    resetErrorState()
                    resolve(true)
                } else {
                    setDetected(true)
                    setLanfound(false)
                    resolve(false)
                }
            } else {
                // Handle the case where data or data.completion is undefined
                console.error('Data or data.completion is undefined')
                // You might want to set default values or handle the error in a different way
                resolve(false) // Assuming false indicates failure in your context
            }
        })        
      .catch(error => {
        console.error('Error handling translation response:', error);
        addError(error.message || 'Failed to fetch');
        reject(error);
      });
    } catch (error) {
      console.error('Error in detecting Language: ', error);
      reject(error);
    }
  });
};


  const handleConvertClick = async () => {
    setActiveTranslations(activeTranslations + 1)
    if (activeTranslations >= 3) {
      addError('- Too many request')
      setActiveTranslations((activeTranslations) => activeTranslations - 1)
      return false
    }
    if (inputText.trim() === '') {
      addError('- No input text to convert')
      setActiveTranslations((activeTranslations) => activeTranslations - 1)
      return false
    }

    //First security measure for api access
    if (!isAuthenticated) {
      addError('Not authenticated')
      setActiveTranslations((activeTranslations) => activeTranslations - 1)
      return false
    }

    if (translationCount >= 100) {
      console.log('Translation count: ' + translationCount)
      addError(
        "You've exceeded your daily translations (100). Come back tomorrow"
      )
      setActiveTranslations((activeTranslations) => activeTranslations - 1)
      return false
    }

    const res = await handleDetect()
    if (!res && inputLanguage === 'AutoDetect') {
      setActiveTranslations((activeTranslations) => activeTranslations - 1)
      return false
    }
    if (!res) {
      setDetected(false)
      addError('Input code is not ' + inputLanguage)
      setActiveTranslations((activeTranslations) => activeTranslations - 1)
      throw new Error('Are you stupid or retarted?')
    }

    try {
      let stat = 'Not Translated'
      //setActiveTranslations(activeTranslations + 1)
      resetErrorState()
      setLoading(true) // Show loading element
      let timeoutId // Initialize timeout variable
      setisStatus500(false)
      setisStatus401(false)

      const timeoutPromise = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
          if (!isStatus500 && !isStatus401) {
            addError(
              '- Please wait, Translation will be here shortly!'
            )
            setIsGreen(false)
          }
        }, 4000) // Set timeout to 4 seconds
      })

      const dataPayload = {
        messages: [
          {
            role: 'system',
            content: inputText,
            source: inputLanguage,
            target: outputLanguage,
            promptNum: 1,
          },
        ],
      }

      fetch('https://codeharbordnd.netlify.app/.netlify/functions/openai', {

        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'auth-provider': 'dbAuth',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPayload),
      })
        .then((response) => {
          setActiveTranslations((activeTranslations) => activeTranslations - 1)

          if (response.ok) {
            setIsGreen(true)
            return response.json()
          } else {
            if (response.status === 500) {
              setIsGreen(false)
              setisStatus500(true)
              addError('API Currently Down. Please try again later')
              addError(response.statusText)
            }
            if (response.status === 503) {
              setIsGreen(false)
              setisStatus500(true)
              addError('API Overloaded. Please try again later')
              addError(response.statusText)
            }
            if (response.status === 400) {
              setIsGreen(false)
              setisStatus500(true)
              addError('Horrible Input. Please check!')
              addError(response.statusText)
            }
            if (response.status === 401) {
              setIsGreen(false)
              setisStatus401(true)
              addError('You must be logged in to make a request')
            } else {
              console.log(response)
              addError(response.statusText)
            }
          }
        })
        .then((data) => {
    // Check if data is defined before accessing its properties
    if (data &&  data.completion) {
      resetErrorState()
      clearTimeout(timeoutId)
      setOutputText(data.completion)
      if (data.completion?.length > 0) {
        stat = 'Successfully Translated'
      }
      createHistory({
        variables: {
          input: {
            inputLanguage,
            outputLanguage,
            inputText,
            outputText: data.completion,
            userId: currentUser.id,
            status: stat,
          },
        },
      })
        .then(() => {
          refetch()
          hRecount()
        })
        .catch((error) => {
          console.error('Error creating history:', error)
        })
    } else {
      console.error('Data is undefined')
      // Handle the case where data is undefined
      // You might want to set default values or handle the error in a different way
    }
  })
        .finally(() => {
          setLoading(false)
        })

      if (activeTranslations < 0) {
        setActiveTranslations(0)
      }
    } catch (error) {
      setActiveTranslations((activeTranslations) => activeTranslations - 1)

      // Log the error
      console.error('Error in translation API:', error)
      // Rethrow the error for further handling in application code
      throw error
    }
    if (activeTranslations < 0) {
      setActiveTranslations(0)
    }

    const feedbackF = document.getElementById('form');
    if (feedbackF) {
      feedbackF.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const [AutoDet, setAutoDet] = useState(false)
  const handleInputLanguageChange = (e) => {
    if (e.target.value === 'AutoDetect') {
      setAutoDet(true)
      setInputLanguage(e.target.value)
      return
    } else {
      setAutoDet(false)
      setLanfound(false)
      setDetected(false)
    }
    if (outputLanguage === e.target.value) {
      setInputLanguage(e.target.value)
      setOutputLanguage(inputLanguage)
    } else {
      setInputLanguage(e.target.value)
    }
  }

  const handleOutputLanguageChange = (e) => {
    if (inputLanguage === e.target.value) {
      setOutputLanguage(e.target.value)
      setInputLanguage(outputLanguage)
    } else {
      setOutputLanguage(e.target.value)
    }
  }

  const handleUploadClick = () => {
    inputFile.current.click()
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    const fileName = file.name
    const fileExtension = fileName.split('.').pop() // Extract file extension
    const supportedLanguages = Object.values(languageToFileExtension)

    if (supportedLanguages.includes(fileExtension)) {
      const language = Object.keys(languageToFileExtension).find(
        (key) => languageToFileExtension[key] === fileExtension
      )
      setInputLanguage(language)

      const reader = new FileReader()
      reader.onload = () => {
        setInputText(reader.result)
      }
      reader.readAsText(file)
    } else {
      throw new Error('- Unsupported File Uploaded')
    }
  }

  const handleCopyClick = () => {
    if (inputText.trim() === '') {
      addError('- No input text to copy')
      throw new Error('- No input text to copy')
    }
    navigator.clipboard.writeText(inputText)
  }

  const handleOutputCopyClick = () => {
    if (outputText.trim() === '') {
      addError('- No output text to copy')
      throw new Error('- No output text to copy')
    }
    navigator.clipboard.writeText(outputText)
  }

  const handleDownloadClick = () => {
    if (inputText.trim() === '') {
      addError('- No input text to download')
      throw new Error('- No input text to download')
    }
    const fileExtension = languageToFileExtension[inputLanguage]
    const fileName = `input.${fileExtension}`
    const blob = new Blob([inputText], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  const handleOutputDownloadClick = () => {
    if (outputText.trim() === '') {
      addError('- No output text to download')
      throw new Error('- No output text to download')
    }
    const fileExtension = languageToFileExtension[outputLanguage]
    const fileName = `output.${fileExtension}`
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' })
    saveAs(blob, fileName)
  }

  const [isGreen, setIsGreen] = useState(true)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const file = e.dataTransfer.files[0]
    handleFileChange({ target: { files: [file] } })
  }

  const [errorFound, setErrorFound] = useState(false)
  const [errors, setErrors] = useState([])

  const resetErrorState = () => {
    setErrorFound(false)
    setErrors([])
  }

  const addError = (error) => {
    resetErrorState()
    setErrorFound(true)
    setErrors((prevErrors) => [...prevErrors, error])
  }

  return (
    <>
      <Metadata title="Translate" description="Translate" />
      <header>
        <Navbar />
      </header>
      <div className={classes.page}>
        <div className={classes.convertContainer}>
          <div className={classes.editorContainer}>
            <div className={classes.buttonContainer}>
              <Button
                variant="contained"
                className={`${classes.button} ${isDragOver ? classes.uploadButtonDragOver : ''
                  }`}
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
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
                aria-label="copy-button"
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
                <Select
                  value={inputLanguage}
                  onChange={handleInputLanguageChange}
                  style={{ color: '#fff' }}
                  aria-label="input-language-dropdown"
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
                  }}
                >
                  <MenuItem value={'java'}>Java</MenuItem>
                  <MenuItem value={'python'}>Python</MenuItem>
                  <MenuItem value={'c'}>C</MenuItem>
                  <MenuItem value={'cpp'}>C++</MenuItem>
                  <MenuItem value={'javascript'}>JavaScript</MenuItem>
                  <MenuItem value={'AutoDetect'}>AutoDetect</MenuItem>
                </Select>

                {AutoDet ? (
                  <Button
                    style={{
                      backgroundColor: '#32368c',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: '#303f9f',
                      },
                      width: '70px',
                      height: '30px',
                      borderRadius: '5px',
                      marginLeft: '10px',
                    }}
                    onClick={handleDetect}
                  >
                    Detect
                  </Button>
                ) : null}
                {detect && AutoDet ? (
                  <p style={{ marginLeft: '10px', color: 'red' }}>
                    {' '}
                    {!LanFound ? 'Unrecognized' : null}
                  </p>
                ) : null}
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
              style={{
                backgroundColor: '#1e1e1e',
                color: '#fff',
                padding: '5px',
                borderRadius: '10px',
                width: 'fit-content',
              }}
            >
              GPT-3 Status
              <IconButton>
                {isGreen ? (
                  <CheckCircle style={{ color: 'green' }} />
                ) : (
                  <HighlightOff style={{ color: 'red' }} />
                )}
              </IconButton>
            </Box>
            <div style={{ width: '156px', height: '60px' }}>
              {errorFound ? (
                <Box
                  boxShadow={3}
                  style={{
                    backgroundColor: '#1e1e1e',
                    color: 'red',
                    padding: '5px',
                    marginTop: '5px',
                    borderRadius: '10px',
                    width: 'fit-content',
                  }}
                >
                  Error:
                  {errors.map((error, indexErr) => (
                    <p key={indexErr}>{error}</p>
                  ))}
                </Box>
              ) : null}
            </div>

            <Button
              variant="contained"
              aria-label="convert-button"
              className={classes.convertButton}
              onClick={handleConvertClick}
              disabled={activeTranslations >= 3}
            >
              Convert
            </Button>
            {loading && (
              <CircularProgress style={{ color: 'white', marginTop: '10px' }} />
            )}
            <br></br>

            <p style={{ color: 'white' }}>In Queue: {activeTranslations}</p>
          </div>
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
                <Select
                  value={outputLanguage}
                  onChange={handleOutputLanguageChange}
                  style={{ color: '#fff' }}
                  aria-label="output-language-dropdown"
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
                  }}
                >
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
        <HistoryForm
          setInputText={setInputText}
          setOutputText={setOutputText}
          setInputLanguage={setInputLanguage}
          setOutputLanguage={setOutputLanguage}
        />
      </div>

      <div >
        <FeedbackForm inputText={inputText} outputText={outputText} inLan={inputLanguage} outLan={outputLanguage}></FeedbackForm>
        {isAuthenticated ? <FeedbacksCell userId={currentUser.id}  onCopyToEditors={handleCopyToEditors} /> : <FeedbacksCell />}

      </div>
    </>
  )
}
export default TranslatePage
