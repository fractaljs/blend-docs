import * as React from "react";
import { ComponentPropsWithoutRef, ElementType } from "react"; // For types
import { Loader2 } from "lucide-react";
import { cn } from "../utils";


// Types from lib/components/Button/types.ts
export enum ButtonType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  DANGER = "danger",
  SUCCESS = "success",
}

export enum ButtonSize {
  SMALL = "sm",
  MEDIUM = "md",
  LARGE = "lg",
}

export enum ButtonSubType {
  DEFAULT = "default",
  ICON_ONLY = "iconOnly",
  LINK = "link",
}

export interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  buttonType?: ButtonType;
  size?: ButtonSize;
  subType?: ButtonSubType;
  text?: string;
  leadingIcon?: ElementType;
  trailingIcon?: ElementType;
  isLoading?: boolean;
  isDisabled?: boolean;
  ariaLabel?: string;
  ariaExpanded?: boolean;
  ariaControls?: string;
  ariaPressed?: boolean | "mixed";
  ariaHasPopup?: boolean | "menu" | "listbox" | "tree" | "grid" | "dialog";
}
// End of types

const ButtonCopy = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      buttonType = ButtonType.PRIMARY,
      size = ButtonSize.MEDIUM,
      subType = ButtonSubType.DEFAULT,
      text,
      leadingIcon: LeadingIcon,
      trailingIcon: TrailingIcon,
      isLoading = false,
      isDisabled = false,
      className,
      children,
      ariaLabel,
      ariaExpanded,
      ariaControls,
      ariaPressed,
      ariaHasPopup,
      ...props
    },
    ref
  ) => {
    // Inlined getButtonClassNames
    const getButtonClassNames_inlined = (
      type: ButtonType,
      currentSize: ButtonSize,
      currentSubType: ButtonSubType
    ): string => {
      // Simulating themeConfig.euler.button structure based on tailwind.config.js and common patterns
      // These would ideally come from a theme object, but we're inlining.

      const baseClasses =
        "inline-flex items-center justify-center font-medium transition-colors duration-150 ease-in-out focus:outline-none disabled:cursor-not-allowed"; // Common base
      const borderRadius = "rounded-[6px]"; // Assuming 'rounded-md' from themeConfig.euler.button.borderRadius

      let sizeSpecificClasses = {
        height: "",
        padding: "",
        fontSize: "", // Will be text-[size] leading-[height]
        gap: "",
        iconSize: "",
      };

      switch (currentSize) {
        case ButtonSize.SMALL:
          sizeSpecificClasses = {
            height: "h-8", // typical small button height
            padding: "px-3", // typical small button padding
            fontSize: "text-[12px] leading-[18px]", // text-body-sm
            gap: "gap-1.5",
            iconSize: "w-4 h-4", // typical small icon
          };
          break;
        case ButtonSize.MEDIUM:
          sizeSpecificClasses = {
            height: "h-10", // typical medium button height
            padding: "px-4",
            fontSize: "text-[14px] leading-[20px]", // text-body-md
            gap: "gap-2",
            iconSize: "w-5 h-5", // typical medium icon
          };
          break;
        case ButtonSize.LARGE:
          sizeSpecificClasses = {
            height: "h-12", // typical large button height
            padding: "px-5",
            fontSize: "text-[16px] leading-[24px]", // text-body-lg
            gap: "gap-2.5",
            iconSize: "w-6 h-6", // typical large icon
          };
          break;
      }

      let typeSpecificClasses = {
        focusClasses: "",
        backgroundColor: "",
        textColor: "",
        hoverBackgroundColor: "",
        activeBackgroundColor: "",
        borderColor: "border border-transparent", // Default border
        disabledBackgroundColor: "bg-[#E1E4EA] text-[#99A0AE]", // gray-200 text-gray-400
      };

      // Link SubType colors
      let linkTypeClasses = {
        text: "",
        hover: "",
        focus: "",
        disabled: "",
      };

      switch (type) {
        case ButtonType.PRIMARY:
          typeSpecificClasses = {
            ...typeSpecificClasses,
            backgroundColor: "bg-[#2B7FFF]", // primary-500
            textColor: "text-[#FFFFFF]", // gray-0
            hoverBackgroundColor: "hover:bg-[#0561E2]", // primary-600
            activeBackgroundColor: "active:bg-[#1447E6]", // primary-700
            focusClasses:
              "focus:ring-2 focus:ring-offset-1 focus:ring-[#51A2FF]", // primary-400 with offset
            disabledBackgroundColor: "bg-[#BEDBFF] text-[#FFFFFF]", // primary-200 text-gray-0 (adjust if needed)
          };
          linkTypeClasses = {
            text: "text-[#2B7FFF]",
            hover: "text-[#0561E2]",
            focus: "focus:text-[#0561E2]",
            disabled: "text-[#8EC5FF]", // primary-500, 600, 300
          };
          break;
        case ButtonType.SECONDARY:
          typeSpecificClasses = {
            ...typeSpecificClasses,
            backgroundColor: "bg-[#FFFFFF]", // gray-0
            textColor: "text-[#2B303B]", // gray-700
            borderColor: "border border-[#CACFD8]", // gray-300
            hoverBackgroundColor: "hover:bg-[#F5F7FA]", // gray-50
            activeBackgroundColor: "active:bg-[#F2F4F8]", // gray-100
            focusClasses:
              "focus:ring-2 focus:ring-offset-1 focus:ring-[#E1E4EA]", // gray-200
            disabledBackgroundColor:
              "bg-[#FFFFFF] text-[#CACFD8] border-[#E1E4EA]", // gray-0 text-gray-300 border-gray-200
          };
          linkTypeClasses = {
            text: "text-[#2B303B]",
            hover: "hover:text-[#0E121B]",
            focus: "focus:text-[#0E121B]",
            disabled: "text-[#99A0AE]", // gray-700, 950, 400
          };
          break;
        case ButtonType.DANGER:
          typeSpecificClasses = {
            ...typeSpecificClasses,
            backgroundColor: "bg-[#FB2C36]", // red-500
            textColor: "text-[#FFFFFF]", // gray-0
            hoverBackgroundColor: "hover:bg-[#E7000B]", // red-600
            activeBackgroundColor: "active:bg-[#C10007]", // red-700
            focusClasses:
              "focus:ring-2 focus:ring-offset-1 focus:ring-[#FF6467]", // red-400
            disabledBackgroundColor: "bg-[#FFC9C9] text-[#FFFFFF]", // red-200
          };
          linkTypeClasses = {
            text: "text-[#FB2C36]",
            hover: "hover:text-[#E7000B]",
            focus: "focus:text-[#E7000B]",
            disabled: "text-[#FFA2A2]", // red-500, 600, 300
          };
          break;
        case ButtonType.SUCCESS:
          typeSpecificClasses = {
            ...typeSpecificClasses,
            backgroundColor: "bg-[#00C951]", // green-500
            textColor: "text-[#FFFFFF]", // gray-0
            hoverBackgroundColor: "hover:bg-[#00A63E]", // green-600
            activeBackgroundColor: "active:bg-[#008236]", // green-700
            focusClasses:
              "focus:ring-2 focus:ring-offset-1 focus:ring-[#00D492]", // green-400
            disabledBackgroundColor: "bg-[#B9F8CF] text-[#FFFFFF]", // green-200
          };
          linkTypeClasses = {
            text: "text-[#00C951]",
            hover: "hover:text-[#00A63E]",
            focus: "focus:text-[#00A63E]",
            disabled: "text-[#7BF1A8]", // green-500, 600, 300
          };
          break;
      }

      if (currentSubType === ButtonSubType.LINK) {
        return cn(
          "font-medium disabled:cursor-not-allowed focus:outline-none", // Base for link
          sizeSpecificClasses.fontSize, // Font size from button size
          linkTypeClasses.text,
          `hover:${linkTypeClasses.hover}`,
          `focus:${linkTypeClasses.focus}`,
          `disabled:${linkTypeClasses.disabled}`
        );
      }

      if (currentSubType === ButtonSubType.ICON_ONLY) {
        return cn(
          baseClasses,
          typeSpecificClasses.focusClasses,
          sizeSpecificClasses.height, // h-sm, h-md, h-lg
          "aspect-square p-0", // Icon only is square and has no padding
          typeSpecificClasses.backgroundColor,
          typeSpecificClasses.textColor,
          typeSpecificClasses.hoverBackgroundColor,
          typeSpecificClasses.activeBackgroundColor,
          typeSpecificClasses.borderColor,
          `disabled:${typeSpecificClasses.disabledBackgroundColor}`,
          borderRadius
        );
      }

      return cn(
        baseClasses,
        typeSpecificClasses.focusClasses,
        sizeSpecificClasses.height,
        sizeSpecificClasses.padding,
        sizeSpecificClasses.fontSize,
        sizeSpecificClasses.gap,
        typeSpecificClasses.backgroundColor,
        typeSpecificClasses.textColor,
        typeSpecificClasses.hoverBackgroundColor,
        typeSpecificClasses.activeBackgroundColor,
        typeSpecificClasses.borderColor,
        `disabled:${typeSpecificClasses.disabledBackgroundColor}`,
        borderRadius
      );
    };

    // Inlined getIconClassNames
    const getIconClassNames_inlined = (
      currentSize: ButtonSize,
      currentIsLoading: boolean
    ): string => {
      const iconSizes = {
        [ButtonSize.SMALL]: "w-4 h-4",
        [ButtonSize.MEDIUM]: "w-5 h-5",
        [ButtonSize.LARGE]: "w-6 h-6",
      };
      const loadingClass = "animate-spin"; // from theme.base.loading (Tailwind 'animate-spin')

      return cn(iconSizes[currentSize], currentIsLoading && loadingClass);
    };

    // Inlined getTextClassNames
    const getTextClassNames_inlined = (currentSize: ButtonSize): string => {
      const fontSizes = {
        [ButtonSize.SMALL]: "text-[12px] leading-[18px]", // text-body-sm
        [ButtonSize.MEDIUM]: "text-[14px] leading-[20px]", // text-body-md
        [ButtonSize.LARGE]: "text-[16px] leading-[24px]", // text-body-lg
      };
      const baseTextClass = "truncate"; // from theme.base.text, assuming it means truncate
      return cn(fontSizes[currentSize], baseTextClass); // Font size might be redundant if already on button
    };

    const resolvedButtonClassNames = getButtonClassNames_inlined(
      buttonType,
      size,
      subType
    );
    const resolvedIconClassNames = getIconClassNames_inlined(size, isLoading);
    const resolvedTextClassNames = getTextClassNames_inlined(size);

    const computedAriaLabel =
      subType === ButtonSubType.ICON_ONLY && !ariaLabel && !text && !children
        ? "Button"
        : ariaLabel;

    return (
      <button
        ref={ref}
        disabled={isDisabled || isLoading}
        className={cn(resolvedButtonClassNames, className)} // className prop for overrides
        aria-label={computedAriaLabel}
        aria-expanded={ariaExpanded}
        aria-controls={ariaControls}
        aria-pressed={ariaPressed}
        aria-haspopup={ariaHasPopup}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading && (
          <Loader2 className={resolvedIconClassNames} aria-hidden="true" />
        )}
        {!isLoading && LeadingIcon && (
          <LeadingIcon className={resolvedIconClassNames} aria-hidden="true" />
        )}
        {(text || children) && (
          <span className={resolvedTextClassNames}>{text || children}</span>
        )}
        {!isLoading && TrailingIcon && (
          <TrailingIcon className={resolvedIconClassNames} aria-hidden="true" />
        )}
      </button>
    );
  }
);

ButtonCopy.displayName = "ButtonCopy";

export default ButtonCopy;
