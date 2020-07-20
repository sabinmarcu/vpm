export declare enum ACTIONS {
    EXIT = 0,
    BACK = 1
}
export declare type MapType = {
    [key: string]: string;
};
export declare type SelectionType<T> = {
    label: string;
    value: keyof T | ACTIONS;
};
export declare type OptionsType<T extends MapType> = {
    options: SelectionType<T>[];
    selection: keyof T | ACTIONS;
    isDirty: boolean;
    select: (key: keyof T | ACTIONS) => void;
};
export declare function useOptions<T extends MapType>(options: T, isDefault?: boolean | undefined): {
    options: {
        label: string;
        value: keyof T;
    }[];
    selection: keyof T;
    isDirty: boolean;
    select: ({ value }: SelectionType<T>) => void;
};
//# sourceMappingURL=useOptions.d.ts.map