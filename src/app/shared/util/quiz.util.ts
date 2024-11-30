import {
  Quiz,
  ResultCategory,
  ResultQuestion,
  ResultQuiz,
  ResultVector,
} from "../models/quiz.model";


export function calculateQuiz(quiz: ResultQuiz) {
  return new ResultVector(quiz.resCategories.map(calculateCategory))
}

export function calculateCategory(cat: ResultCategory) {
  const maxScore = cat.resQuestions.reduce((acc, q) => acc + q.alpha * 2, 0)
  const minScore = maxScore * -1
  return {
    title: cat.title, score: cat.resQuestions.reduce((acc, q) => {
      acc += q.alpha * q.score;
      return acc;
    }, 0)
  }
}

export function resultQuizFromQuiz(quiz: Quiz) {
  return new ResultQuiz(
    quiz.title,
    quiz.categories.map((c) => {
      return new ResultCategory(
        c.title,
        c.questions.map((q) => {
          return new ResultQuestion(q.title, q.alpha);
        })
      );
    })
  );
}
