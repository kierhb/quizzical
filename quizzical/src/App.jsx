import React from 'react'
import { nanoid } from "nanoid"
import Question from "./components/Question"
import Choice from "./components/Choice"


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

    function select(event) {
        console.log(event)
    }

    const quizElements = quizData.map(quiz => {

        console.log(quiz.choices)
        return (
            <div>
                <Question 
                    key={quiz.questionId}
                    question={quiz.question}
                    correct={quiz.correct}
                    selected={quiz.selected}
                    isCorrect={quiz.isCorrect}
                />
                <Choice
                    choices={quiz.choices}
                    isSelected={false}
                    handleClick={select}
                />
            </div>
        )
    })


    return (
        <div className="item--container">
            <button onClick={startGame}>Start</button>
            {quizElements}
        </div>
    )
}

export default App