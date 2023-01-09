import React from "react"
import { nanoid } from "nanoid"
import Question from "./Question"
import Choices from "./Choices"


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

    const quizElements = quizData.map(query => {
        let choices = shuffleArray(query.incorrect_answers.concat(query.correct_answer))

        console.log(choices)

        return (
            <div>
                <Question 
                    key={nanoid()}
                    question={query.question}  
                />
                <div>
                    {choices.map(choice => (
                        <button onClick={selected}>{choice}</button>
                    ))}
                </div>
            </div>
        )
    })

    function selected() {
        console.log(`clicked`)
    }


    return (
        <div>
            <button onClick={startGame}>Start</button>
            {quizElements}
        </div>
    )
}