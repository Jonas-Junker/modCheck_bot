import {modcheck} from "../commands/modcheck";

export const handleCommands = (channel: any, tags: any, message: string, self: any) => {
    if (self) return;

    const commandString = message.toLowerCase().split(' ')

    switch (commandString[0]) {
        case 'modcheck':
            modcheck(channel);
            break;
        default:
            break;
    }
}
