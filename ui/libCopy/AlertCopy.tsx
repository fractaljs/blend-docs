"use client";

import { ReactNode, forwardRef } from "react";
import { Info, X } from "lucide-react";
// Assuming Button and ButtonSubType will also be copied or referenced appropriately.
// For this example, I'm keeping the import, but in a real scenario,
// Button might also need similar treatment or be a shared component.
import Button from "./ButtonCopy";
import { ButtonSubType, ButtonType } from "./ButtonCopy";
import { cn } from "../utils"; // cn is still useful for conditional classes

// Content from types.ts starts here
export enum AlertVariant {
  PRIMARY = "primary",
  SUCCESS = "success",
  WARNING = "warning",
  ERROR = "error",
  PURPLE = "purple",
  ORANGE = "orange",
  NEUTRAL = "neutral",
}

export enum AlertActionPlacement {
  BOTTOM = "bottom",
  RIGHT = "right",
}

export enum AlertStyle {
  FILL = "fill",
  SUBTLE = "subtle",
  NO_FILL = "noFill",
}

export interface AlertAction {
  label: string;
  onClick: () => void;
}

export interface AlertProps {
  heading: string;
  description: string;
  variant?: AlertVariant;
  style?: AlertStyle;
  primaryAction?: AlertAction;
  secondaryAction?: AlertAction;
  onClose?: () => void;
  icon?: ReactNode;
  actionPlacement?: AlertActionPlacement;
}
// Content from types.ts ends here

const AlertCopy = forwardRef<HTMLDivElement, AlertProps>(
  (
    {
      heading,
      description,
      variant = AlertVariant.PRIMARY,
      primaryAction,
      secondaryAction,
      onClose,
      icon,
      style = AlertStyle.FILL,
      actionPlacement = AlertActionPlacement.BOTTOM,
    },
    ref
  ) => {
    // Helper to get button type, inlined from utils.ts
    const getButtonTypeFromAlert = (alertVariant: AlertVariant): ButtonType => {
      switch (alertVariant) {
        case AlertVariant.PRIMARY:
          return ButtonType.PRIMARY;
        case AlertVariant.SUCCESS:
          return ButtonType.SUCCESS;
        case AlertVariant.ERROR:
          return ButtonType.DANGER;
        default:
          return ButtonType.SECONDARY;
      }
    };

    // Inlined getAlertContainerStyles
    const alertContainerStyles = () => {
      const base = "p-4 rounded-[8px] flex flex-col gap-3"; // rounded-lg -> 8px
      let variantBg = "";
      let variantBorder = "";

      switch (variant) {
        case AlertVariant.PRIMARY:
          variantBg =
            style === AlertStyle.FILL
              ? "bg-[#EFF6FF]"
              : style === AlertStyle.SUBTLE
                ? "bg-[#EFF6FF]"
                : "bg-transparent"; // primary-50
          variantBorder =
            style !== AlertStyle.FILL ? "border border-[#DBEAFE]" : ""; // primary-100 for subtle border
          if (style === AlertStyle.NO_FILL)
            variantBorder = "border border-transparent";
          break;
        case AlertVariant.SUCCESS:
          variantBg =
            style === AlertStyle.FILL
              ? "bg-[#F0FDF4]"
              : style === AlertStyle.SUBTLE
                ? "bg-[#F0FDF4]"
                : "bg-transparent"; // green-50
          variantBorder =
            style !== AlertStyle.FILL ? "border border-[#DCFCE7]" : ""; // green-100
          if (style === AlertStyle.NO_FILL)
            variantBorder = "border border-transparent";
          break;
        case AlertVariant.WARNING:
          variantBg =
            style === AlertStyle.FILL
              ? "bg-[#FEFCE8]"
              : style === AlertStyle.SUBTLE
                ? "bg-[#FEFCE8]"
                : "bg-transparent"; // yellow-50
          variantBorder =
            style !== AlertStyle.FILL ? "border border-[#FEF9C2]" : ""; // yellow-100
          if (style === AlertStyle.NO_FILL)
            variantBorder = "border border-transparent";
          break;
        case AlertVariant.ERROR:
          variantBg =
            style === AlertStyle.FILL
              ? "bg-[#FEF2F2]"
              : style === AlertStyle.SUBTLE
                ? "bg-[#FEF2F2]"
                : "bg-transparent"; // red-50
          variantBorder =
            style !== AlertStyle.FILL ? "border border-[#FFE2E2]" : ""; // red-100
          if (style === AlertStyle.NO_FILL)
            variantBorder = "border border-transparent";
          break;
        case AlertVariant.PURPLE:
          variantBg =
            style === AlertStyle.FILL
              ? "bg-[#FAF5FF]"
              : style === AlertStyle.SUBTLE
                ? "bg-[#FAF5FF]"
                : "bg-transparent"; // purple-50
          variantBorder =
            style !== AlertStyle.FILL ? "border border-[#F3E8FF]" : ""; // purple-100
          if (style === AlertStyle.NO_FILL)
            variantBorder = "border border-transparent";
          break;
        case AlertVariant.ORANGE:
          variantBg =
            style === AlertStyle.FILL
              ? "bg-[#FFF7ED]"
              : style === AlertStyle.SUBTLE
                ? "bg-[#FFF7ED]"
                : "bg-transparent"; // orange-50
          variantBorder =
            style !== AlertStyle.FILL ? "border border-[#FFEDD4]" : ""; // orange-100
          if (style === AlertStyle.NO_FILL)
            variantBorder = "border border-transparent";
          break;
        case AlertVariant.NEUTRAL:
        default:
          variantBg =
            style === AlertStyle.FILL
              ? "bg-[#F5F7FA]"
              : style === AlertStyle.SUBTLE
                ? "bg-[#F5F7FA]"
                : "bg-transparent"; // gray-50
          variantBorder =
            style !== AlertStyle.FILL ? "border border-[#F2F4F8]" : ""; // gray-100
          if (style === AlertStyle.NO_FILL)
            variantBorder = "border border-transparent";
          break;
      }
      // Subtle style has specific text colors based on variant, fill does not change text color from base
      let textColor = "";
      if (style === AlertStyle.SUBTLE) {
        switch (variant) {
          case AlertVariant.PRIMARY:
            textColor = "text-[#0561E2]";
            break; // primary-600
          case AlertVariant.SUCCESS:
            textColor = "text-[#00A63E]";
            break; // green-600
          case AlertVariant.WARNING:
            textColor = "text-[#D08700]";
            break; // yellow-600
          case AlertVariant.ERROR:
            textColor = "text-[#E7000B]";
            break; // red-600
          case AlertVariant.PURPLE:
            textColor = "text-[#9810FA]";
            break; // purple-600
          case AlertVariant.ORANGE:
            textColor = "text-[#F54A00]";
            break; // orange-600
          case AlertVariant.NEUTRAL:
            textColor = "text-[#525866]";
            break; // gray-600
        }
      } else if (style === AlertStyle.NO_FILL) {
        switch (variant) {
          case AlertVariant.PRIMARY:
            textColor = "text-[#0561E2]";
            break; // primary-600
          case AlertVariant.SUCCESS:
            textColor = "text-[#00A63E]";
            break; // green-600
          case AlertVariant.WARNING:
            textColor = "text-[#D08700]";
            break; // yellow-600
          case AlertVariant.ERROR:
            textColor = "text-[#E7000B]";
            break; // red-600
          case AlertVariant.PURPLE:
            textColor = "text-[#9810FA]";
            break; // purple-600
          case AlertVariant.ORANGE:
            textColor = "text-[#F54A00]";
            break; // orange-600
          case AlertVariant.NEUTRAL:
            textColor = "text-[#525866]";
            break; // gray-600
        }
      }

      return cn(base, variantBg, variantBorder, textColor);
    };

    // Inlined getAlertHeaderContainerStyles
    const alertHeaderContainerStyles = "flex justify-between items-center";

    // Inlined getAlertIconStyles
    // For subtle and noFill, icon color should match text color
    const iconColor =
      style === AlertStyle.SUBTLE || style === AlertStyle.NO_FILL
        ? variant === AlertVariant.PRIMARY
          ? "text-[#0561E2]"
          : variant === AlertVariant.SUCCESS
            ? "text-[#00A63E]"
            : variant === AlertVariant.WARNING
              ? "text-[#D08700]"
              : variant === AlertVariant.ERROR
                ? "text-[#E7000B]"
                : variant === AlertVariant.PURPLE
                  ? "text-[#9810FA]"
                  : variant === AlertVariant.ORANGE
                    ? "text-[#F54A00]"
                    : "text-[#525866]" // neutral
        : "text-[#525866]"; // Default for fill gray-600
    const alertIconStyles = cn(
      "flex items-center justify-center w-5 h-5",
      iconColor
    );

    // Inlined getHeaderClassNames
    // For subtle and noFill styles, title color matches variant, otherwise default gray-900
    const titleColor =
      style === AlertStyle.SUBTLE || style === AlertStyle.NO_FILL
        ? variant === AlertVariant.PRIMARY
          ? "text-[#0561E2]" // primary-600
          : variant === AlertVariant.SUCCESS
            ? "text-[#00A63E]" // green-600
            : variant === AlertVariant.WARNING
              ? "text-[#D08700]" // yellow-600
              : variant === AlertVariant.ERROR
                ? "text-[#E7000B]" // red-600
                : variant === AlertVariant.PURPLE
                  ? "text-[#9810FA]" // purple-600
                  : variant === AlertVariant.ORANGE
                    ? "text-[#F54A00]" // orange-600
                    : "text-[#525866]" // neutral, gray-600
        : "text-[#181B25]"; // default gray-900
    const headerClassNames = cn(
      "text-[14px] leading-[20px] font-medium",
      titleColor
    ); // text-body-md

    // Inlined getBodyClassNames
    const bodyClassNames =
      actionPlacement === AlertActionPlacement.BOTTOM
        ? "flex flex-col gap-3"
        : "flex items-center justify-between gap-3";

    // Inlined getDescriptionClassNames
    // For subtle and noFill styles, description color matches variant (lighter shade), otherwise default gray-700
    const descriptionColor =
      style === AlertStyle.SUBTLE || style === AlertStyle.NO_FILL
        ? variant === AlertVariant.PRIMARY
          ? "text-[#0561E2]" // primary-600 (Using 600 for description too for now)
          : variant === AlertVariant.SUCCESS
            ? "text-[#00A63E]" // green-600
            : variant === AlertVariant.WARNING
              ? "text-[#A65F00]" // yellow-700 (example of darker shade)
              : variant === AlertVariant.ERROR
                ? "text-[#C10007]" // red-700
                : variant === AlertVariant.PURPLE
                  ? "text-[#8200DB]" // purple-700
                  : variant === AlertVariant.ORANGE
                    ? "text-[#CA3500]" // orange-700
                    : "text-[#717784]" // neutral gray-500
        : "text-[#2B303B]"; // default gray-700
    const descriptionClassNames = cn(
      "text-[12px] leading-[18px]",
      descriptionColor
    ); // text-body-sm

    // Inlined getActionButtonStyles
    const actionButtonStyles = (btnVariant: AlertVariant) => {
      const base = "text-[12px] leading-[18px] font-medium"; // text-body-sm font-medium
      let color = "";
      // Button colors should match the alert variant, but typically a stronger shade for interaction
      switch (btnVariant) {
        case AlertVariant.PRIMARY:
          color = "text-[#1447E6] hover:text-[#193CB8]";
          break; // primary-700 hover:primary-800
        case AlertVariant.SUCCESS:
          color = "text-[#008236] hover:text-[#016630]";
          break; // green-700 hover:green-800
        case AlertVariant.WARNING:
          color = "text-[#A65F00] hover:text-[#894B00]";
          break; // yellow-700 hover:yellow-800
        case AlertVariant.ERROR:
          color = "text-[#C10007] hover:text-[#9F0712]";
          break; // red-700 hover:red-800
        case AlertVariant.PURPLE:
          color = "text-[#8200DB] hover:text-[#6E11B0]";
          break; // purple-700 hover:purple-800
        case AlertVariant.ORANGE:
          color = "text-[#CA3500] hover:text-[#9F2D00]";
          break; // orange-700 hover:orange-800
        case AlertVariant.NEUTRAL:
        default:
          color = "text-[#525866] hover:text-[#2B303B]";
          break; // gray-600 hover:gray-700
      }
      return cn(base, color);
    };

    // Inlined getCloseButtonClassNames
    // For subtle and noFill, close button color should match text color
    const closeButtonColor =
      style === AlertStyle.SUBTLE || style === AlertStyle.NO_FILL
        ? variant === AlertVariant.PRIMARY
          ? "text-[#0561E2] hover:text-[#1447E6]"
          : variant === AlertVariant.SUCCESS
            ? "text-[#00A63E] hover:text-[#008236]"
            : variant === AlertVariant.WARNING
              ? "text-[#D08700] hover:text-[#A65F00]"
              : variant === AlertVariant.ERROR
                ? "text-[#E7000B] hover:text-[#C10007]"
                : variant === AlertVariant.PURPLE
                  ? "text-[#9810FA] hover:text-[#8200DB]"
                  : variant === AlertVariant.ORANGE
                    ? "text-[#F54A00] hover:text-[#CA3500]"
                    : "text-[#717784] hover:text-[#525866]" // neutral gray-500 hover:gray-600
        : "text-[#717784] hover:text-[#2B303B]"; // gray-500 hover:gray-700

    const closeButtonClassNames = cn(closeButtonColor);

    // Inlined getAlertBodyContainerStyles
    const alertBodyContainerStyles = "flex items-center gap-x-3";

    // Inlined getAlertDividerStyles
    const alertDividerStyles = "h-5 w-px bg-[#E1E4EA]"; // gray-200

    return (
      <div ref={ref} className={alertContainerStyles()}>
        <div className={alertHeaderContainerStyles}>
          <div className="flex items-center gap-2">
            {icon ? (
              <div className={alertIconStyles}>{icon}</div>
            ) : (
              <div className={alertIconStyles}>
                <Info size={16} />
              </div>
            )}
            <h3 className={headerClassNames}>{heading}</h3>
          </div>
          {onClose && actionPlacement === AlertActionPlacement.BOTTOM && (
            <button
              className={closeButtonClassNames}
              onClick={onClose}
              aria-label="Close"
            >
              <X size={16} />
            </button>
          )}
        </div>

        <div className={cn(bodyClassNames)}>
          <p className={descriptionClassNames}>{description}</p>

          {(primaryAction ||
            (onClose && actionPlacement === AlertActionPlacement.RIGHT)) && (
            <div className={alertBodyContainerStyles}>
              {(primaryAction || secondaryAction) && (
                <div className={alertBodyContainerStyles}>
                  {" "}
                  {/* Assuming same styles for inner action container */}
                  {primaryAction && (
                    <Button
                      key="primary-action"
                      buttonType={getButtonTypeFromAlert(variant)}
                      onClick={primaryAction.onClick}
                      subType={ButtonSubType.LINK}
                      className={actionButtonStyles(variant)}
                    >
                      {primaryAction.label}
                    </Button>
                  )}
                  {secondaryAction && (
                    <Button
                      key="secondary-action"
                      buttonType={getButtonTypeFromAlert(variant)}
                      onClick={secondaryAction.onClick}
                      subType={ButtonSubType.LINK}
                      className={actionButtonStyles(variant)} // Assuming same style for secondary
                    >
                      {secondaryAction.label}
                    </Button>
                  )}
                </div>
              )}
              {onClose && actionPlacement === AlertActionPlacement.RIGHT && (
                <div className={alertDividerStyles}></div>
              )}
              {onClose && actionPlacement === AlertActionPlacement.RIGHT && (
                <button
                  className={cn(closeButtonClassNames, "ml-2")}
                  onClick={onClose}
                  aria-label="Close"
                >
                  {" "}
                  {/* Added ml-2 for spacing, adjust as needed */}
                  <X size={16} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
);

AlertCopy.displayName = "AlertCopy";

export default AlertCopy;
