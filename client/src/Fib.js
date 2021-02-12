import React, { useState, useEffect } from 'react'
import axios from 'axios'

export const Fib = () => {
    const [values, setValues] = useState(null)
    const [seenIndexes, setSeenIndexes] = useState(null)
    const [index, setIndex] = useState(null)

    const fetchValues = async () => {
        const fectedValues = await axios.get('/api/values/current')
        console.log("fectedValues ", fectedValues)        
        setValues(fectedValues)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        await axios.post('/api/values', {
            "index": index
        })
        setIndex('')
    }

    const fetchIndexes = async () => {
        const seenIndexes = await axios.get('/api/values/all')
        console.log('seenindexes ', seenIndexes)
        setSeenIndexes(seenIndexes.data)
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
        fetchValues()
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
            
            <h3>Calculated values:</h3>
            {renderValues()}
        </div>
        
        }
        
        </>
    )
}
export default Fib