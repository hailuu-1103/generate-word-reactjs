import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";

function App() {
    const [data, setData] = useState(null);
    const [listOfStrings, setListOfStrings] = useState([]);
    const [randomString, setRandomString] = useState('');
    useEffect(() => {
        const url = 'https://raw.githubusercontent.com/dwyl/english-words/master/words_alpha.txt';
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text(); // You can use .json() for JSON data
            })
            .then((data) => {
                const lines = data.split('\n');
                // Set the list of strings in the state
                setListOfStrings(lines);

                // Optionally, set the full data as well
                setData(data);
            })
            .catch((error) => {
                // Handle errors here
                console.error('Error:', error);
            });
    }, []);
    const generateRandomString = () => {
        // Shuffle the list of strings (randomize the order)
        const shuffledList = [...listOfStrings];
        for (let i = shuffledList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledList[i], shuffledList[j]] = [shuffledList[j], shuffledList[i]];
        }

        // Select the first 100 elements and join them with spaces
        const selectedElements = shuffledList.slice(0, 100);

        // Create a single string without line breaks
        const newString = selectedElements.join(' ');

        // Remove any line breaks (\n and \r) with spaces
        const cleanedString = newString.replace(/[\n\r]/g, '');

        // Set the cleaned string in the state
        setRandomString(cleanedString);
    };


    const copyToClipboard = () => {
        // Format the randomString with spaces between each word
        const formattedString = randomString.split('\n').join(' ');

        // Create a temporary text area element to copy text to clipboard
        const textArea = document.createElement('textarea');
        textArea.value = formattedString;

        // Append the text area to the document and select its content
        document.body.appendChild(textArea);
        textArea.select();

        // Copy the selected text to clipboard
        document.execCommand('copy');

        // Remove the text area from the document
        document.body.removeChild(textArea);
    };


    return (
        <div className="App">
            <button onClick={generateRandomString}>Generate</button>
            <div>
                {randomString && (
                    <div>
                        <p>Random String:</p>
                        <pre>{randomString}</pre>
                    </div>
                )}
            </div>
            <button onClick={copyToClipboard}>Copy to Clipboard</button>
        </div>
    );
}

export default App;
