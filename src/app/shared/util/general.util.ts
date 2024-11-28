import { DEVMODE } from "./penv.util";

export function log(...params: any){
    if(DEVMODE){
        params.forEach((element: any) => {
            console.log(element)
        });
    }
}