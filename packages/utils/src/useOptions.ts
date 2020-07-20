import {
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';

import { useBackRoute, useSetRoute } from '@nvpm/navigation';

export enum ACTIONS {
  EXIT,
  BACK,
  HOME,
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
  const go = useSetRoute();
  const allOptions = useMemo(
    () => {
      const baseOptions = (Object.entries(options) as [keyof T, string][])
        .map(([key, value]) => ({
          label: value,
          value: key,
        }));
      const extraOptions: { label: string, value: string | ACTIONS }[] = [
        {
          label: '------',
          value: '',
        },
      ];
      if (!isDefault) {
        extraOptions.push({
          label: 'Back',
          value: ACTIONS.BACK,
        });
        extraOptions.push({
          label: 'Home',
          value: ACTIONS.HOME,
        });
      } else {
        extraOptions.push({
          label: 'Exit',
          value: ACTIONS.EXIT,
        });
      }
      return [...baseOptions, ...extraOptions];
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
      if (selection === ACTIONS.HOME) {
        go('root');
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
