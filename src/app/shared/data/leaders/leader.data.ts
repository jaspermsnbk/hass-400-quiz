import { Leader } from "../../models/leader.model";
import { ResultVector } from "../../models/quiz.model";

export const leaders: Leader[] = [
  {
    name: "Adolf Hitler",
    picture:
      "https://cdn.britannica.com/58/129958-050-C0EF01A4/Adolf-Hitler-1933.jpg",
    blurb:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Pulvinar magnis varius per integer ad elit cursus litora. Facilisis eu vel dignissim nibh mi commodo tristique morbi. Porta amet ut gravida enim nisi parturient. Himenaeos interdum",
    sources: ["https://en.wikipedia.org/wiki/Adolf_Hitler", "https://en.wikipedia.org/wiki/Mein_Kampf" ],
    resVect: new ResultVector([
      {
        title: "Gryffindor",
        score: 6,
        maxScore: 10,
      },
      {
        title: "Hufflepuff",
        score: -3,
        maxScore: 10,
      },
      {
        title: "Ravenclaw",
        score: 0,
        maxScore: 10,
      },
      {
        title: "Slytherin",
        score: 8,
        maxScore: 10,
      },
    ]),
  },
];
