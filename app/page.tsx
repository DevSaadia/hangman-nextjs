"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import QWERTY from "./components/QWERTY";
import LetterHolder from "./components/LetterHolder";
import { words } from "./data/word";

export default function Home() {
  const [chosenWord, setChosenWord] = useState('');
  const [inputValue, setinputValue] = useState('');
  const [guessedArray, setGuessedArray] = useState<string[]>([]);
  const maxMisses = 6;
  const [misses, setMisses] = useState(0)
  // const [imageSource, setimageSource] = useState(`/images/hangman${misses}.png`)
  const [winStatus, setwinStatus] = useState(false);
  const [gameOver, setgameOver] = useState(false);
  const [loseStatus, setloseStatus] = useState(false);


  const [chosenwordArray, setChosenwordArray] = useState<string[]>(new Array(chosenWord.length).fill(''));

  function init() {
    const word = words[Math.floor(Math.random() * words.length)];
    setChosenWord(word);
    setChosenwordArray(new Array(word.length).fill(''));
    setwinStatus(false);
    setgameOver(false);
    setMisses(0);
    setGuessedArray([]);
    setloseStatus(false);
    console.log("init");
  }

  useEffect(() => {
    init();
    // const word = words[Math.floor(Math.random() * words.length)];
    // setChosenWord(word);
    // setChosenwordArray(new Array(word.length).fill(''));
  }, []);

  //this is to make sure whenever the array has all the correct letters, win is shown immediately
  useEffect(() => {
    if (chosenWord && !chosenwordArray.includes('')) {
      console.log("win");
      setwinStatus(true);
      setgameOver(true);
    }
    // if ()

  }, [chosenwordArray, chosenWord]);

  useEffect(() => {
    console.log("inputValue is " + inputValue);
    // console.log("chosenWord " + chosenWord);
    // console.log("chosenwordArray " + chosenwordArray);
    // if (inputValue && chosenWord) {
    //   checkGuess(inputValue);
    // }
  }, []);


  function getChosenWord() {
    return words[Math.floor(Math.random() * words.length)];
  }
  function checkGuess(inputValue: string) {

    // if (guessedArray.includes(inputValue)) {
    //   alert("You have already guessed this letter");
    //   setinputValue('');
    //   return;
    // }
    // console.log("inputValue " + inputValue);
    // console.log("chosenWord " + chosenWord);
    // console.log("chosenwordArray " + chosenwordArray);


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
    setChosenWord(getChosenWord());
    setChosenwordArray(new Array(chosenWord.length).fill(''));
    setwinStatus(false);
    setgameOver(false);
    setMisses(0);
    setGuessedArray([]);
    setloseStatus(false);
  }


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

      <QWERTY
        guess={inputValue}
        onGuessChange={checkGuess}
        guessedLetters={guessedArray}
        maxMisses={maxMisses}
        misses={misses}
      />


      {gameOver &&
        <>
          <button
            className="border border-black bg-white px-4 mt-2 rounded-md disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-gray-200"
            onClick={() => { init() }}
          >
            Reset game
          </button>
          {/* misses = {misses} */}
        </>}



    </main>
  );
}

