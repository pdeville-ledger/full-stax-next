import clsx from "clsx";
import { forwardRef } from "react";
import { arrowIcon } from "../public/reset";
export const enum buttonTypes {
  primary = "primary",
  secondary = "secondary",
  disable = "disable",
}

interface ButtonOptions {
  typeButton: buttonTypes;
  withIcon?: boolean;
}

type Ref = HTMLButtonElement;

export type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;
const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const { type = "button", children, typeButton, withIcon, ...rest } = props;

  const arrow = arrowIcon;
  const merged = clsx(
    "backface-visibility-hidden mt-8 flex transform items-center rounded-full p-6 text-sm font-medium text-white transition hover:bg-opacity-90 focus:outline-none active:bg-opacity-40",
    {
      "bg-black": typeButton === buttonTypes.primary,
      "bg-orange-600": typeButton === buttonTypes.secondary,
      "bg-gray-400": typeButton === buttonTypes.disable,
    }
  );

  return (
    <button
      ref={ref}
      className={merged}
      disabled={typeButton === buttonTypes.disable}
      {...rest}
    >
      <span className="mr-3"> {children}</span>
      {withIcon && arrow}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
