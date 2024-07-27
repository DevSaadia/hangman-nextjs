import React from 'react'
interface LetterHolderProps {
    letter: string;
}
const LetterHolder: React.FC<LetterHolderProps> = ({ letter }) => {
    return (
        <div className='flex justify-center items-center w-12 h-12 rounded-md bg-red-100 border-2 border-pink-500'>
            <p className=''>
                {letter}

            </p>
        </div>
    )
}

export default LetterHolder