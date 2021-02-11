import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Fib = () => {
    const [values, setValues] = useState(null)
    const [seenIndexes, setSeenIndexes] = useState([])
    const [index, setIndex] = useState(null)

    const fetchValues = async () => {
        const values = await axios.get('/api/values/current')
        console.log("values ", values)
        let foundValue = values.data
        
        setValues(foundValue)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        await axios.post('/api/values/send', {
            index: index
        })
        setIndex({index: ''})
    }

    const fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all')
        setSeenIndexes(seenIndexes.data)
    }
    const renderSeenIndexes = () => {
        console.log("seen ", seenIndexes)
        return seenIndexes.map(({ number}) => number).join(', ')
    }
    const renderValues = () => {
        const entries = []
        console.log("render values ", values)
        for (let key in values){
            entries.push(
                <div key={key}>
                    For index {key} I calculated {values[key]}
                </div>
            )
        }
        return entries
    }
    useEffect(() => {
        // fetchValues()
        fetchIndexes()
    }, [index])

    return (
       
        <>
        <form onSubmit={handleSubmit}> 
            <label>Enter your index:</label>
            <input value={index} onChange={event => setIndex(event.target.value)}/>
            <button>Submit</button>
        </form>
        {values && 
        <div>
            <h3>Indexes I have seen:</h3>
            {renderSeenIndexes()}

            <h3>Calculated values:</h3>
            {renderValues()}
        </div>
        
        }
        
        </>
    )
}
export default Fib