export interface Event {
    event: string;
    type: string;
    module?: string;
    listener: (...args: any[]) => void;
}