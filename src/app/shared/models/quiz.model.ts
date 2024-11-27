import { resetQuiz } from "../util/quiz.util";

export class Quiz {
  title!:string;
  categories!: Category[];
}

export class Category {
  title!: string;
  questions!: Question[];
}

export class Question {
  alpha = 1; //value multiplied by the result to change the weight or orientation of the question
  title!: string;
  description?: string;
}

export class ResultQuiz {
  title!:string;
  resCategories!: ResultCategory [];
  constructor(title:string, categories: ResultCategory []) {
    this.title = title
    this.resCategories = categories
  }
}

export class ResultCategory {
  score = 0
  title!: string;
  resQuestions!: ResultQuestion [];
  constructor(title:string, questions: ResultQuestion []) {
    this.score = 0;
    this.title = title;
    this.resQuestions = questions
  }
}

export class ResultQuestion {
  alpha = 1; //value multiplied by the result to change the weight or orientation of the question
  score = 0; //this is where the result of the question should be stored
  title!: string;
  constructor(title: string, alpha?: number) {
    this.score = 0;
    this.title = title;
    this.alpha = alpha !== undefined ? alpha : 1
  }
}