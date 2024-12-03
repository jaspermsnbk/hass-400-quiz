import {
  Quiz,
  ResultCategory,
  ResultQuestion,
  ResultQuiz,
  ResultVector,
} from "../models/quiz.model";
import { log } from "./general.util";
import { POSRANGEMAX } from "./penv.util";


export function calculateQuiz(quiz: ResultQuiz) {
  return new ResultVector(quiz.resCategories.map(betterCalculateCategory))
}

export function calculateCategory(cat: ResultCategory) {
  log(cat.title, cat.maxScore)
  const red = cat.resQuestions.reduce((acc, q) => acc + q.alpha * q.score, 0) 
  const redPMax = red + cat.maxScore
  const redDivMax = redPMax / (cat.maxScore * 2)
  const floorScore = Math.floor(redDivMax * 100)

  log(red, redPMax, redDivMax, floorScore);
  
  return {
    title: cat.title, 
    score: floorScore,
    maxScore: cat.maxScore
  }
}

export function betterCalculateCategory(cat: ResultCategory){
  console.log(cat.title, cat.maxScore)
  const red = cat.resQuestions.reduce((acc, q) => acc + q.alpha * q.score, 0) 
  const redDivMax = red / (cat.maxScore)

  return {
    title: cat.title, 
    score: redDivMax,
    maxScore: cat.maxScore
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
