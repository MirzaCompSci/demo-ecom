import React, {useState,useEffect, Fragment} from 'react';


const RadioBox = ({prices, handleFilters}) => {
    const [value, setValue] = useState(0)

    const HandleChange = (event) => {
        handleFilters(event.target.value)
        setValue(event.target.value)
    }

    return prices.map((p,i) =>(
        <div key={i}>
            <div className='mb-3 form-check'>
            <input onChange={HandleChange} 
            value={`${p._id}`} 
            type='radio' 
            name={p}
            className=' me-2 ms-3 form-check-input'/>
            <label className='form-check-label'>
                {p.name}

            </label>
            </div>
            
        </div>
    ))
}

export default RadioBox