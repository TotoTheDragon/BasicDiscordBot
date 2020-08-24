export interface Event {
    event: string;
    type: string;
    listener: (...args: any[]) => void;
}