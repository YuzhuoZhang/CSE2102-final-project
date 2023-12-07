import React, { useState, useEffect } from 'react';
import quizQuestions from './quizData'; // Ensure your quiz questions are in this file
import ProgressBar from './ProgressBar'; // Your progress bar component

function Quiz() {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState("");
    const [showAnswer, setShowAnswer] = useState(false);

    useEffect(() => {
        let shuffledQuestions = shuffleArray([...quizQuestions]);
        setQuestions(shuffledQuestions);
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const handleAnswerOptionClick = (option) => {
        setSelectedAnswer(option);
        setShowAnswer(true);
        if (option === questions[currentQuestionIndex].answer) {
            setScore(score + 1);
        }

        setTimeout(() => {
            setShowAnswer(false);
            setSelectedAnswer("");
            const nextQuestion = currentQuestionIndex + 1;
            if (nextQuestion < questions.length) {
                setCurrentQuestionIndex(nextQuestion);
            } else {
                setShowScore(true);
            }
        }, 2000); // Delay to show the answer
    };

    const getFinalMessage = () => {
      const percentage = (score / questions.length) * 100;
      if (percentage >= 80) {
          return `Congratulations!!! You scored ${score} out of ${questions.length}. Fantastic!`;
      } else if (percentage >= 50) {
          return `Good job! You scored ${score} out of ${questions.length}.`;
      } else {
          return `You scored ${score} out of ${questions.length}. Keep practicing!`;
      }
  };


    return (
        <div className="container">
            {showScore ? (
                <div className="score-section cute-message">
                    {getFinalMessage()}
                </div>
            ) : (
                <>
                    <ProgressBar currentQuestionIndex={currentQuestionIndex} totalQuestions={questions.length} />
                    <div className="question-section">
                        {questions[currentQuestionIndex] && questions[currentQuestionIndex].image && (
                            <img src={questions[currentQuestionIndex].image} alt="Question" />
                        )}
                        <div className="question-text">
                            {questions[currentQuestionIndex] && questions[currentQuestionIndex].question}
                        </div>
                    </div>
                    <div className="answer-section">
                        {questions[currentQuestionIndex] && questions[currentQuestionIndex].options.map((option, index) => (
                            <button 
                                key={index} 
                                onClick={() => handleAnswerOptionClick(option)}
                                className={`option-button ${showAnswer ? (option === questions[currentQuestionIndex].answer ? 'correct' : 'incorrect') : ''}`}
                                disabled={showAnswer}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

export default Quiz;



