import React, { useState } from 'react';

interface QWERTYProps {
    guess: string;
    onGuessChange: (guess: string) => void;
}

const QWERTY: React.FC<QWERTYProps> = ({ guess, onGuessChange }) => {
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
                            disabled={pressedLetters.includes(letter)}
                            onClick={(e) => {
                                handleClick(letter);
                                handleButtonPress(e);
                            }}
                            className=' rounded-md bg-slate-200 text-gray-500 text-xs p-3 disabled:bg-red-400'
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