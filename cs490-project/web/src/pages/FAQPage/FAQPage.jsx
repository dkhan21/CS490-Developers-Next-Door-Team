import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import Navbar from 'src/components/Navbar/Navbar'
import { Accordion, AccordionSummary, AccordionDetails, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';


const faqData = [
  { question: 'WHAT IS CODEHARBOR?', answer: 'CodeHarbor is an innovative tool that allows for seamless code translation across multiple programming languages.' },
  { question: 'HOW DOES CODEHARBOR WORK?', answer: 'CodeHarbor utilizes GPT-3, one of the most advanced natural language processing (NLP) chatbots in the world, to convert code to a variety of programming languages while maintaining functionality.' },
  { question: 'WHAT PROGRAMMING LANGUAGES DOES CODEHARBOR SUPPORT FOR CODE TRANSLATION?', answer: 'CodeHarbor supports a wide range of programming languages. Specifically, we provide support for Java, Python, C, C++, and JavaScript.' },
  { question: 'WHAT IS GPT-3 AND HOW DOES CODEHARBOR UTILIZE IT?', answer: 'GPT-3 is a state-of-the-art language processing AI model developed by OpenAI. CodeHarbor uses GPT-3 to understand and translate code between different programming languages. Want to learn more? Check out the GPT-3 resources under the \'Resources\' tab in the \'Help\' dropdown' },
  { question: 'HOW CAN I START USING CODEHARBOR FOR CODE TRANSLATION?', answer: 'To start using CodeHarbor, simply input your code in the original language and select the language you want to translate to. Then click the ‘Convert’ button and CodeHarbor will do the rest!' },
  { question: 'ARE THERE ANY LIMITATIONS TO THE CODE TRANSLATION?', answer: 'While CodeHarbor strives to provide accurate translations, there may be some limitations due to the complexity and differences between programming languages. It’s always a good idea to review and test the translated code.' },
  { question: 'IS THERE A COST ASSOCIATED WITH USING CODEHABOR?', answer: 'CodeHarbor is completely free to use. We are committed to providing a cost-free platform for code translation.' },
  { question: 'HOW CAN I REPORT A BUG OR ISSUE?', answer: 'If you encounter a bug or issue, we encourage you to report it via the feedback section on our \'Get Started\' page. We value your input and strive to address all reported issues promptly to ensure a seamless user experience on CodeHarbor.' },
  { question: 'HOW CAN I REQUEST A NEW FEATURE OR IMPROVEMENT?', answer: 'We greatly value your feedback and suggestions! If you have a new feature or improvement in mind, please share your ideas via the feedback section on our \'Get Started\' page. When submitting your request, we encourage you to provide as much detail as possible about the feature or improvement. This will help us understand your needs better. At CodeHarbor, we’re always open to new ideas and strive to continually enhance our platform based on user feedback.' },
  { question: 'WHAT SHOULD I DO IF THE TRANSLATED CODE DOESN\'T WORK AS EXPECTED?', answer: 'If the translated code isn’t working as expected, please report it via the feedback section on our \'Get Started\' page. Include the original and translated code, and describe the issue. We’ll work to improve the translation accuracy based on your feedback.' },
];

const FaqPage = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: '#44BBA4',
      },
    },
  });

  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({})

  // Filter FAQ entries based on search query
  const filteredFAQ = faqData.filter(entry =>
    entry.question.toLowerCase().includes(search.toLowerCase())
  );

  const handleExpandAll = () => {
    const newExpandedState = {};
    filteredFAQ.forEach((entry, index) => {
      newExpandedState[index] = true;
    });
    setExpanded(newExpandedState);
  };

  const handleCollapseAll = () => {
    setExpanded({});
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(prevExpanded => ({ ...prevExpanded, [panel]: isExpanded }));
  };

  return (
    <ThemeProvider theme={theme}>
      <header>
        <Navbar/>
      </header>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginTop: '120px' }}>

      <h1 style={{ marginBottom: "20px "}}>Frequently Asked Questions</h1>
      <p style={{ marginBottom: "40px "}}>Find answers to our most frequently asked questions below. If you can't find what you are looking for please contact us. </p>
      <TextField
        // label="Search FAQ"
        value={search}
        onChange={e => setSearch(e.target.value)}
        variant="outlined"
        style={{ marginBottom: "20px", width: "20%" }}
        InputLabelProps={{ shrink: false }}
        placeholder='Search FAQ'
      />
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '0px', width: '65%' }}>
        <Button onClick={handleExpandAll} color="inherit" sx={{color: '##393E41',
                  position: 'relative',
                  marginRight: '15px !important',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '1px',
                    backgroundColor: 'currentColor',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.5s ease-in-out',
                  },
                  '&:hover:after': {
                    transform: 'scaleX(1)',
                    color: '#44BBA4',
                  },
                  '&:hover':{
                    color:'#44BBA4',
                  }

                  }}>Expand All</Button>
        <div style={{ borderLeft: '1px solid #000', height: '25px', marginRight: '15px' }} />
        <Button onClick={handleCollapseAll} color="inherit" sx={{color: '##393E41',
                  position: 'relative',
                  '&:after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '1px',
                    backgroundColor: 'currentColor',
                    transform: 'scaleX(0)',
                    transformOrigin: 'left',
                    transition: 'transform 0.5s ease-in-out',
                  },
                  '&:hover:after': {
                    transform: 'scaleX(1)',
                    color: '#44BBA4',
                  },
                  '&:hover':{
                    color:'#44BBA4',
                  }

                  }}>Collapse All</Button>
      </div>

      {filteredFAQ.map((entry, index) => (
        <Accordion key={index} expanded={expanded[index] || false} onChange={handleChange(index)} style={{ backgroundColor: 'transparent', boxShadow: 'none', marginTop: '20px', marginBottom: '-10px', width: '65%' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />} style={{ alignItems: 'flex-start' }}>
            <Typography variant="body1" style={{ fontWeight: "bold" }}>{entry.question}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {entry.answer}
          </AccordionDetails>
        </Accordion>
      ))}

    </div>
    </ThemeProvider>
  )
}

export default FaqPage
