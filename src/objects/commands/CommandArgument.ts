export interface CommandArgument<T> {

    name: string;

    identifier: string;

    description: string;

    default?: T;

    required: boolean;

    setName: (paramString: string) => CommandArgument<T>;
    setDefault?: (paramValue: T) => CommandArgument<T>;
    setDescription: (paramString: string) => CommandArgument<T>;
    setRequired: (paramBoolean: boolean) => CommandArgument<T>;

    parse: (paramString: string) => any;

    slice: (paramString: string) => string;

}