import React, { useState } from 'react';

interface QWERTYProps {
    guess: string;
    onGuessChange: (guess: string) => void;
    guessedLetters: string[];
    maxMisses: number;
    misses: number;
}
//TODO: Add a prop to disable the keyboard when misses are maxed out or pressed button
//TODO: Add a prop so keys only appear red if their value is part of the gueessed letters

const QWERTY: React.FC<QWERTYProps> = ({ guess, guessedLetters, onGuessChange, maxMisses, misses }) => {
    const letters = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
    const [pressedLetters, setpressedLetters] = useState<string[]>([]);
    const handleClick = (letter: string) => {
        setpressedLetters([...pressedLetters, letter]);
    };
    const handleButtonPress = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => { onGuessChange(event.currentTarget.value) }
    return (
        <div className='flex flex-col justify-center items-center gap-1 pb-3'>
            {letters.map((row, index) => (
                <div key={index} className='flex gap-1'>
                    {row.split('').map((letter, lindex) => (
                        <button

                            key={lindex}
                            value={letter}
                            disabled={misses > maxMisses}
                            onClick={(e) => {
                                handleClick(letter);
                                handleButtonPress(e);
                            }}
                            className={`rounded-md bg-cyan-600 text-gray-100 text-xs p-3 ${guessedLetters.includes(letter) ? 'bg-cyan-800' : 'bg-cyan-600'}`}
                        >
                            {letter}
                        </button>
                    ))}
                </div>
            ))
            }
        </div >
    );
};

export default QWERTY;