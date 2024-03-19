import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'
import Navbar from 'src/components/Navbar/Navbar'
import { Accordion, AccordionSummary, AccordionDetails, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const faqData = [
  { question: 'Question 1', answer: 'Answer 1' },
  { question: 'Question 2', answer: 'Answer 2' },
  // More entries...
];

const FaqPage = () => {

  const [search, setSearch] = useState('');

  // Filter FAQ entries based on search query
  const filteredFAQ = faqData.filter(entry =>
    entry.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
    {/* <header> 
      <Navbar/> 
    </header> */}
    <TextField
      label="Search FAQ"
      value={search}
      onChange={e => setSearch(e.target.value)}
    />
    {filteredFAQ.map((entry, index) => (
      <Accordion key={index}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          {entry.question}
        </AccordionSummary>
        <AccordionDetails>
          {entry.answer}
        </AccordionDetails>
      </Accordion>
    ))}
  </div>
  )
}

export default FaqPage
