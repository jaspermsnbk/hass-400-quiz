export class Quiz {
  categories!: Category[];
}

export class Category {
  result = 0;
  title!: string;
  questions!: Question[];
}

export class Question {
  alpha = 1; //value multiplied by the result to change the weight or orientation of the question
  result = 0; //this is where the result of the question should be stored
  title!: string;
  description?: string;
}
