import * as React from "react"
import { cn } from "@/lib/utils"

type FormFieldProps = {
  label: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  labelClassName?: string;
  descriptionClassName?: string;
  required?: boolean;
};

export function FormField({
  label,
  description,
  children,
  className = "",
  labelClassName = "",
  descriptionClassName = "",
  required = false,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-2 w-full", className)}>
      <label className={cn("block text-sm font-bold uppercase tracking-wider", labelClassName)}>
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="mt-1">
        {children}
      </div>
      {description && (
        <p className={cn("text-xs text-gray-600 mt-1", descriptionClassName)}>
          {description}
        </p>
      )}
    </div>
  );
}

type FormGroupProps = {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
  description?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
};

export function FormGroup({
  title,
  children,
  className = "",
  titleClassName = "",
  description,
  collapsible = false,
  defaultOpen = true,
}: FormGroupProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  
  const toggleOpen = () => {
    if (collapsible) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={cn(
        "border-2 border-foreground/20 p-4 mb-6 rounded-md",
        "bg-card/80 backdrop-blur-sm shadow-sm",
        "dark:border-border/50 dark:bg-card/50",
        "transition-colors duration-200",
        className
      )}>
      <div 
        className={cn(
          "flex items-center justify-between cursor-pointer",
          collapsible ? "cursor-pointer" : "cursor-default"
        )}
        onClick={toggleOpen}
      >
        <h3 className={cn("text-lg font-ui uppercase tracking-wider flex items-center gap-2 text-foreground", titleClassName)}>
          <span className="inline-block w-3 h-5 bg-primary border border-foreground/20 rounded-sm"></span>
          {title}
        </h3>
        {collapsible && (
          <span className="text-xl font-bold">
            {isOpen ? '−' : '+'}
          </span>
        )}
      </div>
      
      {description && (
        <p className="text-sm text-muted-foreground mt-1 mb-3 font-ui">
          {description}
        </p>
      )}
      
      <div className={cn("space-y-4 mt-4", !isOpen && collapsible ? "hidden" : "block")}>\
        {children}
      </div>
    </div>
  );
}

type FormGridProps = {
  children: React.ReactNode;
  className?: string;
  cols?: 1 | 2 | 3 | 4 | 5 | 6;
  gap?: 'sm' | 'md' | 'lg' | 'xl';
};

export function FormGrid({
  children,
  className = "",
  cols = 2,
  gap = 'md',
}: FormGridProps) {
  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
  };
  
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
    5: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5',
    6: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-6',
  };

  return (
    <div className={cn(
      'grid',
      gridCols[cols],
      gapClasses[gap],
      className
    )}>
      {children}
    </div>
  );
}
