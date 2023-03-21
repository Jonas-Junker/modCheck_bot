export interface ChatMessage {
    id: string;
    type: 'text' | 'file' | 'map' | 'quote';
    user: {
        name: string;
        avatar?: string;
    },
    date: Date;
    text: string;
    files?: any;
    latitude: number;
    longitude: number;
    quote?: string;
    reply: boolean;
}
