import React from "react"


export default function Question(props) {
    return (
        <h3 
        className="question"
        >
            {props.question}
        </h3>
    )
}