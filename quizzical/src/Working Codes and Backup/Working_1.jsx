import React from "react"
import { nanoid } from "nanoid"
import Question from "./Question"


export default function Quiz() {

    const [game, setGame] = React.useState(false)

    function startGame() {
        setGame(prevGame => !prevGame)
    }

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

    const [quizData, setQuizData] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&category=30")
           .then(response => response.json())
           .then(data => data.results)
           let que = []

    }, [game])

    const quizElements = quizData.map(question => {
        return (
            <Question 
                key={question.id}
                question={question.question}
                choices={question.choices}
                id={question.id}
            />
        )
    })

    return (
        <div>
            <button onClick={startGame}>Start</button>
            {quizElements}
        </div>
    )
}