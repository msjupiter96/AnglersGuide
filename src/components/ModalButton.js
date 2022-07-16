import React from 'react';
import '../styles/ButtonStyle.css';


const ModalButton = ({updatebuttonstatus, text}) => {
    
    // The button returns a boolean indicating it was clicked, also need
    // to add the text being passed on so the button can have multiple uses
    return(
        <div className='button-container'>
            <button onClick={updatebuttonstatus}>{text}</button>
        </div>
    )
}

export default ModalButton;