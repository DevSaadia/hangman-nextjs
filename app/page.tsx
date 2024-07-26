"use client"
import { useState } from "react";

export default function Home() {
  const chosenWord = 'HAWAII';
  const [inputValue, setinputValue] = useState('');
  const [guessedArray, setGuessedArray] = useState<string[]>([]);
  const maxMisses = 6;
  const [misses, setMisses] = useState(0)

  const [chosenwordArray, setChosenwordArray] = useState<string[]>(new Array(chosenWord.length).fill('_'));


  function checkGuess(inputValue: string) {

    setGuessedArray([...guessedArray, inputValue]);

    console.log(chosenWord.includes(inputValue));
    if (chosenWord.includes(inputValue)) {
      const newChosenwordArray = [...chosenwordArray];


      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === inputValue) {
          newChosenwordArray[i] = inputValue;

        }
      }
      setChosenwordArray(newChosenwordArray);

    }
    else {
      setMisses(misses + 1);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1>Welcome to Hangman!</h1>
      <p>Number of missses: {misses}</p>
      <div className="flex flex-row text-lg">
        {chosenwordArray.map((letter, index) => (<p key={index}>{letter}&nbsp;</p>))}</div>
      <div id="guessed-container" className="border border-black p-4">
        <h3>Guessed Letters:</h3>
        {guessedArray.map((letter, index) => (<p key={index}>{letter}</p>))}
      </div>
      <input
        value={inputValue}
        onChange={(e) => { setinputValue(e.target.value.toUpperCase()) }} />
      <button
        onClick={() => { checkGuess(inputValue) }}
        className="border border-black bg-white px-4 mt-2 rounded-md">
        Guess
      </button>


    </main>
  );
}
