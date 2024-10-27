import { Label } from 'flowbite-react';

export default function FormError({ errors }: { errors?: string | undefined }) {
  return (
    <div className="mb-2 block">
      <Label
        className="px-2 text-red-600 "
        htmlFor="input-failure"
        value={errors}
      />
    </div>
  );
}
