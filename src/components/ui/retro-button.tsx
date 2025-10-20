import { ButtonHTMLAttributes, forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'steam-button inline-flex items-center justify-center whitespace-nowrap rounded-sm text-sm font-ui font-medium tracking-tight transition-all focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--steam-border-light)] focus-visible:ring-offset-0 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'hover:bg-[#3E4637] text-white',
        primary: 'hover:bg-[#3E4637] text-white',
        secondary: 'hover:bg-[#3E4637] text-[var(--steam-text-light)]',
        destructive: 'hover:bg-[#3E4637] text-white',
        outline: 'bg-transparent text-white hover:bg-[#3E4637]',
        ghost: 'bg-transparent text-white hover:bg-[#3E4637]',
        link: 'underline-offset-4 hover:underline text-[var(--steam-link)]',
      },
      size: {
        default: 'h-9 px-3',
        sm: 'h-8 px-2',
        lg: 'h-10 px-4',
        icon: 'h-8 w-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const RetroButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
RetroButton.displayName = 'Button';

export { RetroButton, buttonVariants };
