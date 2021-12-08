import React from 'react'

const Test = ({startRaffle}) => {
    return (
        <div>
            <button onClick={()=>startRaffle()}>Start Raffle</button>
        </div>
    )
}

export default Test
