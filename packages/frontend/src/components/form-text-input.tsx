import { TextInput } from 'flowbite-react';
import { ChangeEventHandler, FocusEventHandler } from 'react';

import { FormElement } from './form-element';
import FormError from './form-error';

export function FormTextInput({
  id,
  label,
  value,
  placeholder,
  required,
  type,
  autoComplete,
  autoFocus,
  touched,
  errors,
  onChange,
  onBlur,
}: {
  id: string;
  label: string;
  value?: string | undefined;
  placeholder?: string | undefined;
  required: boolean;
  type?: string | undefined;
  autoComplete?: string | undefined;
  autoFocus?: boolean | undefined;
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  onBlur?: FocusEventHandler<HTMLInputElement> | undefined;
  touched?: boolean | undefined;
  errors?: string | undefined;
}) {
  const isInError = (): boolean => {
    return (touched ?? false) && (errors ? true : false);
  };

  return (
    <FormElement htmlFor={id} labelValue={label}>
      <TextInput
        autoFocus={autoFocus}
        id={id}
        value={value}
        placeholder={placeholder}
        required={required}
        type={type}
        autoComplete={autoComplete}
        onChange={onChange}
        onBlur={onBlur}
      />
      {isInError() && (
        // <div className="mb-2 block">
        //   <Label className="text-red-600 px-2 " htmlFor="input-failure" value={errors} />
        // </div>
        <FormError errors={errors} />
      )}
    </FormElement>
  );
}
