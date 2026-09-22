import { useState, type ChangeEvent, type FormEvent } from 'react';

type Validator<T> = {
  [K in keyof T]?: (value: T[K], all: T) => string | undefined;
};

export function useForm<T extends object>(initial: T, validate: Validator<T> = {}) {
  const [values, setValues] = useState<T>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});

  const setField = <K extends keyof T>(key: K, value: T[K]) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const register = <K extends keyof T>(key: K) => ({
    name: String(key),
    value: values[key],
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setField(key, e.target.value as T[K]),
    onBlur: () => setTouched((p) => ({ ...p, [key]: true })),
  });

  const runValidate = (v: T): Partial<Record<keyof T, string>> => {
    const result: Partial<Record<keyof T, string>> = {};
    (Object.keys(validate) as Array<keyof T>).forEach((key) => {
      const rule = validate[key];
      if (!rule) return;
      const message = rule(v[key], v);
      if (message) result[key] = message;
    });
    return result;
  };

  const handleSubmit = (onValid: (v: T) => void) => (e: FormEvent) => {
    e.preventDefault();
    const errs = runValidate(values);
    setErrors(errs);
    setTouched(
      (Object.keys(values) as Array<keyof T>).reduce<Partial<Record<keyof T, boolean>>>(
        (acc, key) => ({ ...acc, [key]: true }),
        {},
      ),
    );
    if (Object.keys(errs).length === 0) onValid(values);
  };

  const reset = () => {
    setValues(initial);
    setErrors({});
    setTouched({});
  };

  return { values, errors, touched, register, setField, handleSubmit, reset };
}
