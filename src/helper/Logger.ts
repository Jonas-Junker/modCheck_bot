import {colours} from "../classes/colors";

export class Logger {

    public static info = (text: string) => {
        console.log(colours.fg.green, '#############', text, '#############', colours.reset)
    }

    public static log = (text: string) => {
        console.log(colours.fg.crimson, text)
    }

    public static error = (text: string) => {
        console.log(colours.fg.crimson, text)
    }

    public static success = (text: string) => {
        console.log(colours.fg.crimson, text)
    }
}

