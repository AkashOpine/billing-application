import React from "react";
import styled from "styled-components";

interface ContentHeadingProps {
  children: React.ReactNode;
  marginBottom?: string;
  marginTop?: string;
  textAlign?: "left" | "center" | "right";
}

const StyledContentHeading = styled.h1<{
  marginBottom?: string;
  marginTop?: string;
  textAlign?: string;
}>`
  font-family: "Roboto";
  font-size: 20px;
  font-weight: 500;
  line-height: 23.44px;
  margin-bottom: ${(props) => props.marginBottom || "0"};
  margin-top: ${(props) => props.marginTop || "0"};

  text-align: ${(props) => props.textAlign || "left"};
`;

const ContentHeading: React.FC<ContentHeadingProps> = ({
  children,
  marginBottom,
  textAlign,
  marginTop,
}) => {
  return (
    <StyledContentHeading
      marginBottom={marginBottom}
      textAlign={textAlign}
      marginTop={marginTop}
    >
      {children}
    </StyledContentHeading>
  );
};

export default ContentHeading;
