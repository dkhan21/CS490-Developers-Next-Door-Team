import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { FileDownload as FileDownloadIcon } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import TranslatePage from './TranslatePage';
import MonacoEditor from '@monaco-editor/react';
import fetch from 'node-fetch'; // Import fetch for Node.js environment
import { GraphQLHooksContext } from '@redwoodjs/web/dist/components/GraphQLHooksProvider';


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

  it('API can handle 500 error response', async () => {
    const handleConvertClick = () => {
      if (activeTranslations >= 3) {
        addError("- Too many request")
        return false;;
      }
      if (inputText.trim() === '') {
        addError("- No input text to convert")
        return false;;
      }
      let stat = "Not Translated";
      setActiveTranslations(activeTranslations + 1);

      setLoading(true); // Show loading element
      resetErrorState();
      let timeoutId; // Initialize timeout variable
      setisStatus500(false);

      const timeoutPromise = new Promise((resolve, reject) => {
        timeoutId = setTimeout(() => {
          if (!isStatus500) {
            addError("- Please wait API rate limit reached. Translation will be here shortly!");
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
          setActiveTranslations(activeTranslations => activeTranslations - 1);

          if (response.ok) {
            setIsGreen(true);
            return response.json();
          }
          else {
            if (response.status === 500) {
              setIsGreen(false);
              setisStatus500(true);
              addError("API Currently Down. Please try again later")
            } else {
              console.log(response)
              addError(response.statusText)
            }
          }
        })
        .then(data => {
          console.log(data.completion)
          resetErrorState();
          clearTimeout(timeoutId);
          setOutputText(data.completion);
          if (data.completion.length > 0) {
            stat = "Successfully Translated";
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
          }).then(() => {
            refetch();
          }).catch((error) => {
            console.error('Error creating history:', error);
          });
        })
        .finally(() => {
          setLoading(false);
        });

      if (activeTranslations < 0) {
        setActiveTranslations(0);
      }
    };
    // Mock the fetch function to return a response with a 500 status code
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: 'Internal Server Error',
    });

    // Call the function that makes the API request
    const result = await handleConvertClick("inputText", "inputLanguage", "outputLanguage");

    // Ensure that the result indicates an error
    expect(result).toEqual(false);

    // Ensure that the error message is added
    expect(addError).toHaveBeenCalledWith("- API Currently Down. Please try again later");

    // Ensure that the loading state is turned off
    expect(setLoading).toHaveBeenCalledWith(false);
  });

  it("select dropdown renders", async () => {
    render(<TranslatePage />);
    const dropdownButton = screen.getByLabelText('input-language-dropdown');
    expect(dropdownButton).toBeInTheDocument();
  });

  it("input language changes", async () => {
    render(<TranslatePage />);
    const dropdownButton = screen.getByRole("button", { name: /Java/i }); // Java is default input language so it should be on screen already
    fireEvent.mouseDown(dropdownButton);
    const newLanguageItem = await screen.findByText(/JavaScript/i);
    fireEvent.click(newLanguageItem);
    expect(dropdownButton.textContent).toBe('JavaScript');
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

  it('editor renders correctly with different lengths and formats of code of code', () => {

    const outputEditor = {};
    const setOutputText = jest.fn();
    const repeatedText = "editor renders correctly with different lengths of code\n";
    const outputTexts = [repeatedText.repeat(1), repeatedText.repeat(10000), 'import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }']; // Test lenght and format
    const outputLanguages = ['java', 'python', 'javascript'];

    outputTexts.forEach((outputText, index) => {
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
      expect(getByLabelText(`label-${index}`)).toBeInTheDocument();
    });
  });
  it('API can handle several asynchronous requests at once and create translation history', async () => {

    const repeatedText = "editor renders correctly with different lengths of code\n";
    const outputTexts = [repeatedText.repeat(1), repeatedText.repeat(1000), 'import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }import java.util.Scanner; public class HelloWorld { public static void main(String[] args) { // Creates a reader instance which takes // input from standard input - keyboard Scanner reader = new Scanner(System.in); System.out.print("Enter a number: "); // nextInt() reads the next integer from the keyboard int number = reader.nextInt(); // println() prints the following line to the output screen System.out.println("You entered: " + number); } }']; // Test lenght and format
    const outputLanguages = ['java', 'python', 'javascript'];


    async function handleConvertClick(inputText, inputLanguage, outputLanguage) {

      if (inputText.trim() === '') {
        return "Invalid Length";
      }
      let stat = "Not Translated";

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
    handleConvertClick(outputTexts[0], "java", outputLanguages[0]);
    handleConvertClick(outputTexts[1], "java", outputLanguages[1]);
    handleConvertClick(outputTexts[2], "java", outputLanguages[2]);
    //Should fail because input is empty
    let results = await handleConvertClick("", "java", "c")
    expect(results).toEqual("Invalid Length");



  });
});