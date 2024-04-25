import { cva } from "class-variance-authority";

// component props is used to set the type for extra button props apart from variant and size
// want to have different types of buttons
// with the help of cva

export const buttonStyles = cva(["transition-colors"], {
  variants: {
    variant: {
      default: ["bg-secondary", "hover:bg-secondary-hover"],
      ghost: ["hover:bg-gray-100"],
      dark: ["bg-secondary-dark", "hover:bg-secondary-dark-hover", "text-secondary"]
    },
    size: {
      default: ["rounded", "p-2"],
      icon: ["rounded-full", "w-10", "h-10", "flex", "items-center", "justify-center", "p-2.5"]
    }
  },
  defaultVariants: {
    variant: "default",
    size: "default"
  }
});
