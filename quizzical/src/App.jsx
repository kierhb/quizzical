import React from 'react'
import { nanoid } from "nanoid"


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

            const incorrectAnswers = query.incorrect_answers.map(wrong => {
                return {
                    choice: wrong,
                    isCorrect: false
                }
            })

            const correctAnswer = {
                    choice: query.correct_answer,
                    isCorrect: true
                }

            const allChoices = shuffleArray(incorrectAnswers.concat(correctAnswer))

            return {
                questionId: nanoid(),
                question: query.question,
                correct: query.correct_answer,
                selected: null,
                choices: allChoices,
                isCorrect: false
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