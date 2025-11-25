import styled from 'styled-components';
import React, { FC } from 'react';

interface IconButtonProps {
  $primary?: boolean;
  icon?: FC<{ color?: string; size?: string }>; // Icon component with color and size props
  children?: React.ReactNode;
  bg?: string;
  color?: string;
  onClick?: () => void;
  width?: string;
  borderRadius?: string;
  border?: string;
  iconColor?: string;
  iconSize?: string; // Optional iconSize prop
  height?: string;
  padding?: string; // Optional padding prop
  type?: 'button' | 'submit' | 'reset'; // New type prop
  as?: string;
  iconPosition?: 'left' | 'right'; // New iconPosition prop
}

const getColor = (bg?: string, color?: string) => {
  if (color) return color;
  if (!bg || bg === 'white' || bg === '#ffffff' || bg === 'transparent') {
    return 'black';
  }
  return 'white';
};

const Button = styled.button<{ $primary?: boolean; bg?: string; color?: string; width?: string; borderRadius?: string; border?: string; height?: string; padding?: string }>`
  background: ${(props) => (props.bg ? props.bg : "#FFFFFF4D")};
  display: flex;
  align-items: center;

  justify-content: center;
  border: ${(props) => (props.border ? props.border : '0.5px solid #B0B0B0')};
  padding: ${(props) => (props.padding ? props.padding : '1em')};
  font-size: 14px;
  font-weight: 400;
  border-radius: ${(props) => (props.borderRadius ? props.borderRadius : '4px')};
  color: ${(props) => getColor(props.bg, props.color)};
  height: ${(props) => (props.height ? props.height : '36px')};
  width: ${(props) => (props.width ? props.width : 'auto')};
  transition: all 0.3s ease-in-out;
`;

const DropsImage = styled.div<{ hasChildren: boolean; size?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.size || '20px'};
  height: ${(props) => props.size || '20px'};
`;

const IconButton: FC<IconButtonProps> = ({
  $primary = false,
  icon: Icon,
  children,
  bg,
  color,
  onClick,
  width,
  borderRadius,
  border,
  iconColor,
  iconSize,
  height,
  padding, // New padding prop
  type = 'button', // Default type prop
  as,
  iconPosition = 'left', // New iconPosition prop
}) => (
  <Button
    $primary={$primary}
    bg={bg}
    color={color}
    onClick={onClick}
    width={width}
    borderRadius={borderRadius}
    border={border}
    height={height}
    padding={padding} // Apply padding prop
    type={type} // Apply type prop
    as={as}
  >
    {iconPosition === 'left' && Icon && (
      <DropsImage hasChildren={!!children} size={iconSize}>
        <Icon color={iconColor} size={iconSize} />
      </DropsImage>
    )}
    {children}
    {iconPosition === 'right' && Icon && (
      <DropsImage hasChildren={!!children} size={iconSize}>
        <Icon color={iconColor} size={iconSize} />
      </DropsImage>
    )}
  </Button>
);

export default IconButton;
