import React from "react"


export default function Choices(props) {

    const styles = {
        backgroundColor: props.isSelected ? "#D6DBF5" : "#F5F7FB",
        border: props.isSelected ? "none" : "1px solid #4D5B9E"
    }


    return (
         <div className="choices--container">
            {props.choices.map(choice => (
                <button 
                    className="choices" 
                    onClick={props.handleClick}
                    style={styles}
                >
                    {choice}
                </button>
            ))}
        </div>
    )
}