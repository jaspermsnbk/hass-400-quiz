import { Category, Quiz } from "../models/quiz.model";

export function calculateQuiz(quiz: Quiz) {
  return quiz.categories.map(calculateCategory);
}

export function calculateCategory(cat: Category) {
  cat.questions.reduce((acc, q) => {
    acc += q.alpha * q.result;
    return acc;
  }, 0);
}
