"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import QWERTY from "./components/QWERTY";
import LetterHolder from "./components/LetterHolder";

export default function Home() {
  const chosenWord = 'HAWAII';
  const [inputValue, setinputValue] = useState('');
  const [guessedArray, setGuessedArray] = useState<string[]>([]);
  const maxMisses = 6;
  const [misses, setMisses] = useState(0)
  // const [imageSource, setimageSource] = useState(`/images/hangman${misses}.png`)
  const [winStatus, setwinStatus] = useState(false);
  const [gameOver, setgameOver] = useState(false);
  const [loseStatus, setloseStatus] = useState(false);

  const [chosenwordArray, setChosenwordArray] = useState<string[]>(new Array(chosenWord.length).fill(''));

  //this is to make sure whenever the array has all the correct letters, win is shown immediately
  useEffect(() => {
    if (!chosenwordArray.includes('')) {
      console.log("win");
      setwinStatus(true);
      setgameOver(true);
    }
    // if ()

  }, [chosenwordArray]);



  function checkGuess(inputValue: string) {

    if (guessedArray.includes(inputValue)) {
      alert("You have already guessed this letter");
      setinputValue('');
      return;
    }


    setGuessedArray([...guessedArray, inputValue]);

    // console.log(chosenWord.includes(inputValue));
    //if the letter is in the word, replace the _ with the letter in the '_' array
    if (chosenWord.includes(inputValue)) {
      const newChosenwordArray = [...chosenwordArray];
      for (let i = 0; i < chosenWord.length; i++) {
        if (chosenWord[i] === inputValue) {
          newChosenwordArray[i] = inputValue;
        }
      }
      setChosenwordArray(newChosenwordArray);
      console.log("chosenwordArray after changing");
      console.log(chosenwordArray);
    }
    else {
      setMisses(misses + 1);
      console.log("misses" + misses);
      console.log("maxmisses" + maxMisses);
      console.log("boolean" + (misses >= maxMisses));
      setgameOver(misses >= maxMisses);
      setloseStatus(misses >= maxMisses);
    }
    setinputValue('');
  }

  function resetGame() {
    setChosenwordArray(new Array(chosenWord.length).fill(''));
    setwinStatus(false);
    setgameOver(false);
    setMisses(0);
    setGuessedArray([]);
  }

  // function validateInput(e: React.ChangeEvent<HTMLInputElement>) {
  //   const value = e.target.value;
  //   const allowedCharacters = /^[a-zA-Z]*$/; // Regular expression to allow only letters

  //   if (value === '' || allowedCharacters.test(value)) {
  //     setinputValue(value);
  //   }
  // }

  return (
    <main className="flex min-h-screen flex-col items-center justify-start p-24">

      <h1 className="text-lg mb-4">Welcome to Hangman!</h1>
      <div className="w-76 h-96  ">
        <Image className=" object-cover w-full h-full rounded-lg" src={`/images/${misses}.jpg`} width={400} height={400} alt={""} />
      </div>
      {/* <p>Number of missses: {misses}</p> */}
      {gameOver && <h3>Game over!</h3>}
      {gameOver && winStatus && <h3>You win!</h3>}
      {loseStatus && <h3>The word was {chosenWord}.</h3>}



      <div className="flex flex-row text-lg my-3 gap-1">
        {chosenwordArray.map((letter, index) => (
          <LetterHolder key={index} letter={letter} />

        ))
        }
      </div>

      <QWERTY guess={inputValue} onGuessChange={checkGuess} />
      {/* <div id="guessed-container" className="border border-black p-4">
        <h3>Guessed Letters:</h3>
        <div className="flex flex-row gap-2">
          {guessedArray.map((letter, index) => (<p key={index}>{letter}</p>))}</div>
      </div>
      <input
        value={inputValue}
        onChange={(e) => { setinputValue(e.target.value.toUpperCase()) }} />
      <button
        onClick={() => { checkGuess(inputValue) }}
        className="border border-black bg-white px-4 mt-2 rounded-md disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-gray-200"
        disabled={gameOver}
      >
        Guess
      </button> */}

      {gameOver &&
        <button
          className="border border-black bg-white px-4 mt-2 rounded-md disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-gray-200"
          onClick={() => { resetGame() }}
        >
          Reset game
        </button>}


    </main>
  );
}

