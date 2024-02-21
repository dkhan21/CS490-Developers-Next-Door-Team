import { Link, routes } from '@redwoodjs/router';
import { Metadata } from '@redwoodjs/web';
import { useState } from 'react';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import ArrowForward from '@material-ui/icons/ArrowForward';
import AceEditor from 'react-ace';

import 'brace/mode/java';
import 'brace/mode/python';
import 'brace/mode/c_cpp';

/// Maybe add dropdown to let user select theme
import 'brace/theme/github';
import 'brace/theme/monokai';
import 'brace/theme/solarized_dark';
import 'brace/theme/tomorrow';
import 'brace/theme/twilight';
import 'brace/theme/xcode';
/*
INSTALLS IN TERMINAL:
yarn add @material-ui/core
yarn add react-ace brace
yarn add @material-ui/icons
*/

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '20px',
    position: 'relative', // To allow absolute positioning of the arrow
  },
  editor: {
    width: '300px',
    height: '200px',
    '& textarea': {
      overflowWrap: 'break-word', // This will break the text to prevent overflow
    },
  },
  arrow: {
    position: 'absolute',
    top: '-30px', // Adjust the top position to move the arrow up
    left: '50%', // Adjust as needed
    transform: 'translateX(-50%)',
    fontSize: '2rem', // Increase the font size to make the arrow bigger
  },
}));


const TranslatePage = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [inputLanguage, setInputLanguage] = useState('java');
  const [outputLanguage, setOutputLanguage] = useState('python');

  const handleConvertClick = () => {
    setOutputText(inputText);
  };

  const handleInputLanguageChange = (e) => {
    setInputLanguage(e.target.value);
  };

  const handleOutputLanguageChange = (e) => {
    setOutputLanguage(e.target.value);
  };

  return (
    <>
      <Metadata title="Translate" description="Translate page" />

      <h1>Translate Page</h1>
      <p>
        Find me in{' '}
        <code>./web/src/pages/TranslatePage/TranslatePage.jsx</code>
      </p>
      <p>
        My default route is named <code>translate</code>, link to me with{' '}
        <Link to={routes.translate()}>Translate</Link>
      </p>

      <div className={classes.container}>
        <div>
          <Select value={inputLanguage} onChange={handleInputLanguageChange}>
            <MenuItem value={'java'}>Java</MenuItem>
            <MenuItem value={'python'}>Python</MenuItem>
            <MenuItem value={'c_cpp'}>C++</MenuItem>
          </Select>
          <AceEditor
            className={classes.editor}
            mode={inputLanguage}
            theme="github"
            onChange={setInputText}
            value={inputText}
            name="input-editor"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
        
        <ArrowForward className={classes.arrow} />

        <Button variant="contained" color="primary" onClick={handleConvertClick}>
          Convert
        </Button>

        <div>
          <Select value={outputLanguage} onChange={handleOutputLanguageChange}>
            <MenuItem value={'java'}>Java</MenuItem>
            <MenuItem value={'python'}>Python</MenuItem>
            <MenuItem value={'c_cpp'}>C++</MenuItem>
          </Select>
          <AceEditor
            className={classes.editor}
            mode={outputLanguage}
            theme="github"
            onChange={setOutputText}
            value={outputText}
            name="output-editor"
            editorProps={{ $blockScrolling: true }}
          />
        </div>
      </div>
    </>
  );
};

export default TranslatePage;
