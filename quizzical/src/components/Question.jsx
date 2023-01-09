import React from "react"


export default function Question(props) {
    return (
        <div className="question--container">
            <h3>{props.question}</h3>
        </div>
    )
}