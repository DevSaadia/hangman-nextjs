import React, { useState } from 'react';

const QWERTY = () => {
    const letters = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];
    const [pressedLetters, setpressedLetters] = useState<string[]>([]);
    const handleClick = (letter: string) => {
        setpressedLetters([...pressedLetters, letter]);
    };

    return (
        <div className='flex flex-col justify-center items-center gap-1 pb-3'>
            {letters.map((row, index) => (
                <div key={index} className='flex gap-1'>
                    {row.split('').map((letter, lindex) => (
                        <button

                            key={lindex}
                            disabled={pressedLetters.includes(letter)}
                            onClick={() => handleClick(letter)}
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