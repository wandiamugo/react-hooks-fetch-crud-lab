import React, {useState, useEffect} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    fetch("http://localhost:4000/questions")
    .then((response) => response.json())
    .then((questions) => {setQuestions(questions)})
  }, [])

  function handleDeleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const updatedQuestions = questions.filter((quiz) => quiz.id !== id);
        setQuestions(updatedQuestions);
      });
  }

  function handleChange(id,index) {
    fetch(` http://localhost:4000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ index }),
    })
      .then((r) => r.json())
      .then((updateQuestion) => {
        const updatedQuestions = questions.map((quiz) => {
          if (quiz.id === updateQuestion) return updateQuestion;
          return quiz;
        });
        setQuestions(updatedQuestions);
      });
  }
  const questionItems = questions.map((question) => (
    <QuestionItem key={question.id}
      question={question}
      onAnswerChange={handleChange}
      onDelete={ handleDeleteQuestion}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
       {questionItems}
      </ul>
    </section>
  );
}

export default QuestionList;
