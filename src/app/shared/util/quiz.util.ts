import {
  Category,
  Quiz,
  ResultCategory,
  ResultQuestion,
  ResultQuiz,
} from "../models/quiz.model";

export const DEVMODE = false

export function calculateQuiz(quiz: ResultQuiz) {
  return quiz.resCategories.map(calculateCategory);
}

export function calculateCategory(cat: ResultCategory) {
  return cat.resQuestions.reduce((acc, q) => {
    acc += q.alpha * q.score;
    return acc;
  }, 0);
}

export function resetQuiz(quiz: Quiz) {
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
