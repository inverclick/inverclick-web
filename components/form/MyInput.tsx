"use client";

import { Input } from "@inverclick/inverclick-ui/input";
import { FastField, type FieldProps, getIn } from "formik";

interface Props extends React.ComponentProps<typeof Input> {
  label?: string;
  name: string;
  description?: string;
  [x: string]: any;
}

export const MyInput = ({
  name,
  label = "",
  description = "",
  ...props
}: Props) => {
  return (
    <FastField name={name}>
      {({ field, form }: FieldProps) => (
        <div className="flex flex-col w-full gap-1">
          {label.length ? <p className="text-okid-text-02">{label}</p> : null}
          <Input {...field} {...props} />
          {description.length ? (
            <p className="text-sm text-okid-text-02 pl-2">{description}</p>
          ) : null}
          {getIn(form.errors, name) && getIn(form.touched, name) ? (
            <p className="pl-2 text-xs text-red-600">
              {getIn(form.errors, name)}
            </p>
          ) : null}
        </div>
      )}
    </FastField>
  );
};
