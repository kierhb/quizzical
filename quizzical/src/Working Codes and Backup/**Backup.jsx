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

    //console.log(quizData)

    const quizElements = quizData.map(query => {
        console.log(query.choices)
        return (
            <div className="item--container">
                <Question 
                    key={query.questionId}
                    id={query.questionId}
                    question={query.question}
                    answers={query.answers}
                />
                <div>{query.choices.map(item => {console.log(item)})}</div>
                <Choices
                    choices={query.choices.map(item => {return (item.choiceId + " " + item.choice)})}
                    id={query.choices.map(item => {return (item.choiceId)})}
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