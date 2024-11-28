import { DEVMODE } from "./quiz.util";

export function log(...params: any){
    if(DEVMODE){
        params.forEach((element: any) => {
            console.log(element)
        });
    }
}