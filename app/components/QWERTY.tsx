import React, { useState } from 'react';

interface QWERTYProps {

    guess: string;
    onGuessChange: (guess: string) => void;
    guessedLetters: string[];
    maxMisses: number;
    misses: number;
}
//TODO: Add a prop to disable the keyboard when misses are maxed out or pressed button
//TODO: Add a prop so keys only appear red if their value is part of the guessed letters

const QWERTY: React.FC<QWERTYProps> = ({ guess, guessedLetters, onGuessChange, maxMisses, misses }) => {
    const letters = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];


    const handleButtonPress = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, letter: string) => { onGuessChange(letter) }

    return (
        <div className='flex flex-col justify-center items-center gap-1 pb-3'>
            {letters.map((row, index) => (
                <div key={index} className='flex gap-1'>
                    {row.split('').map((letter, lindex) => (
                        <button

                            key={lindex}
                            value={letter}
                            disabled={misses > maxMisses || guessedLetters.includes(letter)}
                            onClick={(e) => {
                                const target = e.target as HTMLButtonElement;

                                handleButtonPress(e, letter);
                            }}
                            className={`rounded-md bg-cyan-600 flex items-center justify-center text-gray-100 w-8 h-10 text-xs p-3 ${guessedLetters.includes(letter) ? 'bg-cyan-800' : 'bg-cyan-600'}`}
                        >
                            {letter}
                            {/* "button is "{misses > maxMisses} */}
                        </button>
                    ))}
                </div>
            ))
            }
        </div >
    );
};

export default QWERTY;