import React from "react";
import { useTokenValue, useTokenStyle } from "@vte/react";
/**
 * Button 组件 - 使用 design tokens
 *
 * @example
 * ```tsx
 * <Button variant="primary" size="medium">Primary</Button>
 * <Button variant="secondary" size="small">Secondary</Button>
 * <Button variant="ghost" disabled>Disabled</Button>
 * ```
 */
export function Button({ children, variant = "primary", size = "medium", disabled = false, loading = false, onClick, style: customStyle, className, }) {
    // 使用 useTokenValue 获取单个 token
    const primaryColor = useTokenValue("semantic.color.primary");
    const bgColor = useTokenValue("semantic.color.background");
    const textColor = useTokenValue("semantic.color.text");
    // 使用 useTokenStyle 批量转换样式
    const tokenStyle = useTokenStyle({
        padding: "semantic.spacing.medium",
    });
    // 变体样式
    const variantStyles = {
        primary: {
            backgroundColor: primaryColor,
            color: "#ffffff",
            border: "none",
        },
        secondary: {
            backgroundColor: bgColor,
            color: textColor,
            border: `1px solid ${primaryColor}`,
        },
        ghost: {
            backgroundColor: "transparent",
            color: primaryColor,
            border: "none",
        },
        danger: {
            backgroundColor: "#ef4444",
            color: "#ffffff",
            border: "none",
        },
    };
    // 尺寸样式
    const sizeStyles = {
        small: {
            padding: "0.25rem 0.5rem",
            fontSize: "0.875rem",
        },
        medium: {
            padding: tokenStyle.padding,
            fontSize: "1rem",
        },
        large: {
            padding: "0.75rem 1.5rem",
            fontSize: "1.125rem",
        },
    };
    // 状态样式
    const stateStyles = disabled
        ? {
            opacity: 0.5,
            cursor: "not-allowed",
        }
        : {};
    // 组合所有样式
    const style = {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5rem",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        fontWeight: 500,
        transition: "all 0.2s ease",
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...stateStyles,
        ...customStyle,
    };
    return (<button style={style} disabled={disabled || loading} onClick={onClick} className={className}>
      {loading && (<span style={{
                width: "1em",
                height: "1em",
                border: "2px solid currentColor",
                borderTopColor: "transparent",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
            }}/>)}
      {children}
    </button>);
}
/**
 * ButtonGroup 组件 - 按钮组容器
 *
 * @example
 * ```tsx
 * <ButtonGroup>
 *   <Button>Left</Button>
 *   <Button>Center</Button>
 *   <Button>Right</Button>
 * </ButtonGroup>
 * ```
 */
export function ButtonGroup({ children, direction = "horizontal", gap = "0.5rem", }) {
    const style = {
        display: "flex",
        flexDirection: direction === "vertical" ? "column" : "row",
        gap,
        alignItems: direction === "vertical" ? "stretch" : "center",
    };
    return <div style={style}>{children}</div>;
}
/**
 * IconButton 组件 - 无文字的图标按钮
 *
 * @example
 * ```tsx
 * <IconButton icon={<AddIcon />} label="Add item" />
 * ```
 */
export function IconButton({ icon, label, size = "medium", disabled = false, onClick, }) {
    const primaryColor = useTokenValue("semantic.color.primary");
    const sizeMap = {
        small: "2rem",
        medium: "2.5rem",
        large: "3rem",
    };
    const style = {
        width: sizeMap[size],
        height: sizeMap[size],
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
        color: primaryColor,
        border: "none",
        borderRadius: "4px",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        transition: "all 0.2s ease",
    };
    return (<button style={style} disabled={disabled} onClick={onClick} aria-label={label} title={label}>
      {icon}
    </button>);
}
