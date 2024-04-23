import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { FileDownload as FileDownloadIcon } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import TranslatePage from './TranslatePage';
import MonacoEditor from '@monaco-editor/react';
import fetch from 'node-fetch'; // Import fetch for Node.js environment
import { GraphQLHooksContext } from '@redwoodjs/web/dist/components/GraphQLHooksProvider';
import hljs from 'highlight.js';
import { useMutation } from '@redwoodjs/web';
import { MemoryRouter } from 'react-router-dom';

jest.mock('src/components/Navbar/Navbar', () => {
  return function DummyNavbar() {
    return <div />;
  };
});
jest.mock('src/components/FeedbackForm/FeedbackForm', () => {
  return function DummyFeedback() {
    return <div />;
  };
});
jest.mock('@redwoodjs/web', () => {
  return {
    __esModule: true, 
    useMutation: jest.fn(),
    useQuery: jest.fn(() => ({
      loading: false,
      error: null,
      data: {},
      refetch: jest.fn(),
    }))
  };
});

global.navigator.clipboard = { writeText: jest.fn() };
jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
global.alert = jest.fn();

describe('TranslatePage', () => {
  
  it('renders successfully', () => {
    expect(() => {
      <GraphQLHooksContext.Provider>render(<TranslatePage />)</GraphQLHooksContext.Provider>
    }).not.toThrow()
  })
  it('copy button works', () => {
    const inputText = 'Test text';
    const handleCopyClick = () => {
      navigator.clipboard.writeText(inputText);
    };
    const { getByLabelText } = render(
      <Button
        aria-label="copy-button"
        variant="contained"
        onClick={handleCopyClick}
      >
        <FileCopyIcon fontSize="large" />
      </Button>
    );
    fireEvent.click(getByLabelText('copy-button'));
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(inputText);
  });

  it('download button works', () => {
    const outputText = 'Test output';
    const outputLanguage = 'javascript';
    const languageToFileExtension = { javascript: 'js' };
    const fileExtension = languageToFileExtension[outputLanguage];
    const fileName = `output.${fileExtension}`;
    const blob = new Blob([outputText], { type: 'text/plain;charset=utf-8' });

    const handleOutputDownloadClick = () => {
      if (outputText.trim() === '') {
        alert('There is no output to download.');
        return;
      }
      saveAs(blob, fileName);
    };

    const { getByLabelText } = render(
      <Button
        variant="contained"
        onClick={handleOutputDownloadClick}
        aria-label="download-output-button"
      >
        <FileDownloadIcon fontSize="large" />
      </Button>
    );

    fireEvent.click(getByLabelText('download-output-button'));

    expect(saveAs).toHaveBeenCalledWith(blob, fileName);
  });

  it('Handle Unsupported File upload error response', () => {
    global.FileReader = jest.fn(() => ({
      readAsText: jest.fn(),
      result: 'Mock file content',
      onload: null,
      onerror: null,
    }));

    // Mock the upload function
    const uploadFile = jest.fn();

    // Create a fake input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.addEventListener('change', () => {
      // Trigger the file change event with an unsupported file extension
      const file = new File([''], 'unsupportedFile.txt', { type: 'text/plain' });
      fireEvent.change(fileInput, { target: { files: [file] } });

      // Assert that the error message is displayed
      expect(document.body).toHaveTextContent('- Unsupported File Uploaded');

      // Assert that the upload function was not called
      expect(uploadFile).not.toHaveBeenCalled();
    });
  });

  it('Handle 500 error response', async () => {

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    // Call the function under test
    const response = await fetch('https://codeharbordnd.netlify.app/.netlify/.redwood/functions/openai');

    // Verify that the response is an error
    expect(response.ok).toBe(false);

  });

  it('Handle 503 error response', async () => {

    global.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 500,
      json: async () => ({ error: 'Internal Server Error' }),
    });

    // Call the function under test
    const response = await fetch('https://codeharbordnd.netlify.app/.netlify/.redwood/functions/openai');

    // Verify that the response is an error
    expect(response.ok).toBe(false);

  });

  it('handles different character encoding', async () => {
    const input = "こんにちは世界"
    const inlang = "java";
    const outlang = "python"
    let result = '';
    async function handleConvertClick(input, inlang, outlang) {
      if (input.trim() === '') {
        return "Invalid Length";
      }

      const dataPayload = {
        "messages": [
          {
            "role": "system",
            "content": input,
            "source": inlang,
            "target": outlang,
            "promptNum": 2
          }
        ]
      };

      try {
        const response = await fetch('https://codeharbordnd.netlify.app/.netlify/.redwood/functions/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataPayload)
        });

        if (!response.ok) {
          throw new Error('Error Has Occurred');
        }

        const data = await response.json();
        result = data.completion;
      } catch (error) {
        console.error(error);
        result = "Unrecognized";
      }
    }

    // Call multiple requests
    await handleConvertClick(input, inlang, outlang);
    // Should fail because input is unrecognized
    expect(result).toEqual("Unrecognized");
  })

  it('Handles Unsupported Languages', async () => {
    const input = "aaaaaaaaa";
    const outputLanguages = ['java', 'python', 'javascript', 'c', 'cpp'];
    let result;

    async function handleConvertClick(inputText, inputLanguage, outputLanguage) {
      if (inputText.trim() === '') {
        return "Invalid Length";
      }

      const dataPayload = {
        "messages": [
          {
            "role": "system",
            "content": inputText,
            "source": inputLanguage,
            "target": outputLanguage,
            "promptNum": 2
          }
        ]
      };

      try {
        const response = await fetch('https://codeharbordnd.netlify.app/.netlify/.redwood/functions/openai', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataPayload)
        });

        if (!response.ok) {
          throw new Error('Error Has Occurred');
        }

        const data = await response.json();
        result = data.completion;
      } catch (error) {
        console.error(error);
        result = "Unrecognized";
      }
    }

    // Call multiple requests
    await handleConvertClick(input, "java", outputLanguages[1]);
    // Should fail because input is unrecognized
    expect(result).toEqual("Unrecognized");
  });



  it('editor renders correctly with different code inputs and languages', () => {
    const inputEditor = {};
    const setInputText = jest.fn();
    const inputTexts = ['Test input text 1', 'Test input text 2', 'Test input text 3'];
    const inputLanguages = ['java', 'python', 'javascript'];

    inputTexts.forEach((inputText, index) => {
      const { getByLabelText } = render(
        <div aria-label={`label-${index}`} key={index}>
          <MonacoEditor
            forwardedRef={inputEditor}
            id={`input-editor-${index}`}
            name={`inputEditor-${index}`}
            height="535px"
            width="550px"
            options={{
              fontSize: 14,
              scrollBeyondLastLine: false,
            }}
            language={inputLanguages[index]}
            theme="vs-dark"
            onChange={setInputText}
            value={inputText}
            aria-label={`Input Monaco Editor ${index}`}
          />
        </div>
      );
      expect(getByLabelText(`label-${index}`)).toBeInTheDocument();
    });
  });

  it('editor renders correctly with different lengths and formats of code of code, performing well', () => {

    const outputEditor = {};
    const setOutputText = jest.fn();
    const repeatedText = "editor renders correctly with different lengths of code\n";
    const outputTexts = [repeatedText.repeat(1), repeatedText.repeat(10000), 'import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }']; // Test lenght and format
    const outputLanguages = ['java', 'python', 'javascript'];

    outputTexts.forEach((outputText, index) => {
      const start = performance.now()

      const { getByLabelText } = render(
        <div aria-label={`label-${index}`} key={index}>
          <MonacoEditor
            forwardedRef={outputEditor}
            id={`output-editor-${index}`}
            name={`outputEditor-${index}`}
            height="535px"
            width="550px"
            options={{
              fontSize: 14,
              scrollBeyondLastLine: false,
            }}
            language={outputLanguages[index]}
            theme="vs-dark"
            onChange={setOutputText}
            value={outputText}
            aria-label={`Output Monaco Editor ${index}`}
          />
        </div>
      );

      const end = performance.now();
      const renderTime = end-start;
      expect(getByLabelText(`label-${index}`)).toBeInTheDocument();
      expect(renderTime).toBeLessThan(100); //renders quickly

    });
  });
  it('API can handle several asynchronous requests at once and create translation history', async () => {

    const repeatedText = "editor renders correctly with different lengths of code\n";
    const outputTexts = [repeatedText.repeat(1), repeatedText.repeat(1000), 'import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }']; // Test lenght and format
    const outputLanguages = ['java', 'python', 'javascript'];
    const isAuthenticated = true;
    
    async function handleConvertClick(inputText, inputLanguage, outputLanguage, translationCount) {

      if (inputText.trim() === '') {
        return "Invalid Length";
      }
      if(!isAuthenticated){
        return "Not logged in";
      }
      if(translationCount >= 100){
        
        //addError("You've exceeded your daily translations (100). Come back tomorrow")
        return "Exceeded Translations";
      }
      let stat = "Not Translated";

      const dataPayload = {
        "messages": [
          {
            "role": "system",
            "content": inputText,
            "source": inputLanguage,
            "target": outputLanguage,
            "promptNum": 1
          }
        ]
      };

      fetch('https://codeharbordnd.netlify.app/.netlify/.redwood/functions/openai', {
        mode: 'cors',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPayload)
      })

        .then(response => {
          
          if (response.ok) {
            return response.json();
          }
          else {
            throw new Error('Error Has Occurred');
          }
        })
        .then(data => {
          if (data.completion.length > 0) {
            stat = "Successfully Translated";

          }
          else {
            throw new Error('Empty Response');
          }
          mockGraphQLMutation('createHistory', ({ inputLanguage, outputLanguage, inputText, outputText, userId, status }) => {
            return {
              histories: {
                inputLanguage,
                outputLanguage,
                inputText,
                outputText,
                userId,
                status,
              }
            }
          });


        });

      return true;

    }

    //Call multiple requests
    handleConvertClick(outputTexts[0], "java", outputLanguages[0], 0);
    handleConvertClick(outputTexts[1], "java", outputLanguages[1], 0);
    handleConvertClick(outputTexts[2], "java", outputLanguages[2], 0);
    //Should fail because input is empty
    let results = await handleConvertClick("", "java", "c", 0)
    expect(results).toEqual("Invalid Length");
    //Should fail because there are too many translations
    let tCountTest = await handleConvertClick("test", "java", "c", 100)
    expect(tCountTest).toEqual("Exceeded Translations");
  });


  it('does not create history if translation fails', async () => {
    const inputText = "input";
    const inputLanguage = "lang";
    const outputLanguage = "lang2";
    const mockCreateHistory = jest.fn();

    async function handleConvertClick(inputText, inputLanguage, outputLanguage) {
      if (inputText.trim() === '') {
        return "Invalid Length";
      }
    }
    handleConvertClick(inputText, inputLanguage, outputLanguage)

    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        json: () => Promise.resolve({ message: 'API failure' })
      })
    );
    
    useMutation.mockReturnValue([
      jest.fn(), 
      { loading: false, error: null, data: null } 
    ]);
  
    expect(mockCreateHistory).not.toHaveBeenCalled();
  
    global.fetch.mockRestore();
    jest.restoreAllMocks();
  });
  

});
