import React from 'react';
import { render, fireEvent, screen  } from '@testing-library/react';
import Button from '@material-ui/core/Button';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import { FileDownload as FileDownloadIcon } from '@mui/icons-material';
import { saveAs } from 'file-saver';
import TranslatePage from './TranslatePage';
import MonacoEditor from '@monaco-editor/react';

jest.mock('src/components/Navbar/Navbar', () => {
  return function DummyNavbar() {
    return <div />;
  };
});

global.navigator.clipboard = { writeText: jest.fn() };
jest.mock('file-saver', () => ({ saveAs: jest.fn() }));
global.alert = jest.fn();

describe('TranslatePage', () => {
  it('renders successfully', () => {
    expect(() => {
      render(<TranslatePage />)
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
});