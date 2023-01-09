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
           .then(data => setQuizData(data.results))
    }, [game])

    const quizElements = quizData.map(question => {
        let choices = []
        choices.push(question.incorrect_answers)
        choices.push(question.correct_answer)

        return (
            <Question 
                key={question.id}
                question={question.question}
                choices={shuffleArray(choices)}
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