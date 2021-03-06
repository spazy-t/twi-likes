import React, { useRef } from 'react'
import {
    STORAGE_PREFS,
    TWITTER_DATA_KEY
} from '../utils/constants'

//storage pref component to allow user to choose if data is stored on their computer for user searches
const Storage = () => {
    const pref = useRef()
    const container = useRef()

    //when the save btn is clciked the pref is saved in local storage, if false then clear any saved search data.
    const handleClick = () => {
        localStorage.setItem(STORAGE_PREFS, pref.current.checked)

        //if the user chooses not to use local storage, remove any currently saved data
        if(!pref.current.checked) {
            localStorage.removeItem(TWITTER_DATA_KEY)
        }

        //animate out component and wait to then remove visability
        container.current.classList.add('xyz-out')
        setTimeout(() => {
            container.current.style.display = 'none'
        }, 1000)
    }

    //renders storage preference component with text, bootstrap switch and button to confirm/save user choice
    return(
        <div className='fixed-bottom bg-light pb-3 text-dark' xyz='fade down' ref={ container }>
            <div className='d-flex flex-column align-items-center'>
                <h5 className='pt-2'>Storage option, please choose</h5>
                <hr className='border border-dark w-25 m-0' />
                <div className='custom-control custom-switch mt-2'>
                    <input type='checkbox' className='custom-control-input' id='customSwitch1' ref={ pref } defaultChecked />
                    <label className='custom-control-label' htmlFor='customSwitch1' />
                </div>
                <p className='text-center pl-2 pr-2'>This option saves your last search, on your computer, for next time. If turned off the search will be lost.
                This data is <em>NOT</em> saved anywhere else or shared with anyone.</p>
                <button className='btn btn-info' onClick={ handleClick }>
                    Save
                </button>
            </div>
        </div>
    )
}

export default Storage