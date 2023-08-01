export type ValueTypes = "null" | "number";

export interface RuntimeVal {
    type: ValueTypes;
}

export interface NullVal extends RuntimeVal{
    type: "null";
    value: "null"; // optional for convenience, but not actually used in the runtime.
}

export interface NumberVal extends RuntimeVal {
    type: "number";
    value: number;
}
