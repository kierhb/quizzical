import React from 'react'
import { nanoid } from "nanoid"
import Question from "./components/Question"
import Choices from "./components/Choices"


function App() {

    const [game, setGame] = React.useState(false)

    function startGame() {
        setGame(prevGame => !prevGame)
        console.log(game)
    }

    const shuffleArray = (arr) => arr.sort(() => Math.random() - 0.5)

    const [quizData, setQuizData] = React.useState([])

    React.useEffect(() => {
        fetch("https://opentdb.com/api.php?amount=10&category=30")
        .then(response => response.json())
        .then(data => setQuizData(data.results.map(query => {
            const allChoices = shuffleArray(query.incorrect_answers.concat(query.correct_answer))
            const choices = allChoices.map(choice => {
                return {
                    choiceId: nanoid(),
                    choice: choice,
                    isSelected: false
                }
            }) 
    
            return {
                questionId: nanoid(),
                question: query.question,
                choices: choices,
                correct: query.correct_answer,
                chosen: null,
                checked: false
            }
        })))
    }, [game])

    console.log(quizData)

    return (
        <div className="item--container">
            <button onClick={startGame}>Start</button>
        </div>
    )
}

export default App