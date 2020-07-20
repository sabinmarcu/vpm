import {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useBackRoute } from './useNavigation';

export enum ACTIONS {
  EXIT,
  BACK,
}
export type MapType = { [key: string]: string };
export type SelectionType<T> = { label: string, value: keyof T | ACTIONS };
export type OptionsType<T extends MapType> = {
  options: SelectionType<T>[],
  selection: keyof T | ACTIONS,
  isDirty: boolean,
  select: (key: keyof T | ACTIONS) => void,
};

export function useOptions<T extends MapType>(
  options: T,
  isDefault?: boolean | undefined,
) {
  const back = useBackRoute();
  const allOptions = useMemo(
    () => {
      const baseOptions = (Object.entries(options) as [keyof T, string][])
        .map(([key, value]) => ({
          label: value,
          value: key,
        }));
      const extraOption = isDefault
        ? {
          label: 'Exit',
          value: ACTIONS.EXIT,
        } : {
          label: 'Back',
          value: ACTIONS.BACK,
        };
      return [...baseOptions, extraOption];
    },
    [options, isDefault],
  );
  const [selection, setSelection] = useState(allOptions[0].value);
  const [isDirty, setIsDirty] = useState(false);
  const select = useCallback(
    ({ value }: SelectionType<T>) => {
      if (value in options || value in ACTIONS) {
        setSelection(value);
        if (!isDirty) {
          setIsDirty(true);
        }
      }
    },
    [setSelection, options, setIsDirty],
  );
  useEffect(
    () => {
      if (isDefault && selection === ACTIONS.EXIT) {
        process.exit(0);
      }
      if (selection === ACTIONS.BACK) {
        setIsDirty(false);
        setSelection(allOptions[0].value);
        back();
      }
    },
    [selection, isDefault, back, allOptions, setIsDirty, setSelection],
  );
  return {
    options: allOptions,
    selection,
    isDirty,
    select,
  };
}
