import { DEVMODE } from "./quiz.util";

export function log(...params: any){
    if(DEVMODE){
        console.log(params)
    }
}