import { ResultVector } from "./quiz.model"

export class Leader {
    name!: string
    blurb!: string | string []
    picture!: string
    sources!: string []
    resVect!: ResultVector 
}

export class LeaderScore {
    name!: string
    scores!: ResultVector
}