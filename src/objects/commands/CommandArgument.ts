export interface CommandArgument {

    name: string;

    identifier: string;

    description: string;

    required: boolean;

    setName: (paramString: string) => CommandArgument;
    setDescription: (paramString: string) => CommandArgument;
    setRequired: (paramBoolean: boolean) => CommandArgument;

    parse: (paramString: string) => any;

    slice: (paramString: string) => string;

}