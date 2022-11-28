import {modcheck} from "../commands/modcheck";

export const commandHandler = (channel: any, tags: any, message: string, self: any) => {
    const commandString = message.toLowerCase().split(' ')

    switch (commandString[0]) {
        case 'modcheck':
            modcheck(channel);
            break;
        default:
            break;
    }
}
