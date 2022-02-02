export declare namespace prompt {
    type RevalidatorSchema = Partial<Revalidator.ISchema<any>> & {
        ask?: AskFunction | undefined;
        name?: string | undefined;
        raw?: [string, string] | undefined;
        hidden?: boolean
    };

    interface Properties {
        [name: string]: RevalidatorSchema | string;
    }

    interface Schema {
        properties: Properties;
    }
}