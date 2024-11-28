import {
  Category,
  Quiz,
  ResultCategory,
  ResultQuestion,
  ResultQuiz,
  ResultVector,
} from "../models/quiz.model";

export const DEVMODE = true

export function calculateQuiz(quiz: ResultQuiz) {
  return new ResultVector(quiz.resCategories.map(calculateCategory))
}

export function calculateCategory(cat: ResultCategory) {
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
