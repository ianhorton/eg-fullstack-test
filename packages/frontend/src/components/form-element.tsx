import { Label } from "flowbite-react";
import { ReactNode } from "react";

export function FormElement({
  children,
  htmlFor,
  labelValue,
}: {
  children: ReactNode;
  htmlFor: string;
  labelValue?: string;
}) {
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor={htmlFor} value={labelValue} />
      </div>
      {children}
    </div>
  );
}
