export interface Error {
    status?: number;
    statusCode?: number;
    data?: Array<{}>;
    message?: string;
}

export interface ErrorConstructor {
    new(message?: string): Error;
    (message?: string): Error;
    readonly prototype: Error;
}

export declare var Error: ErrorConstructor;