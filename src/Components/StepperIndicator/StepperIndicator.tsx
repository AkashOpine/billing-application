import React from "react";
import styled from "styled-components";

const steps = [1, 2, 3, 4];

interface StepperIndicatorProps {
  currentStep?: number; // Make currentStep optional
}

const StepperContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: white;
  padding: 16px;
  width: 100%;
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  flex: 1;

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    top: 50%;
    right: -50%;
    height: 1px;
    width: 100%;
    background-color: #696969;
    z-index: 0;
  }
`;

const StepCircle = styled.div<{ active: boolean }>`
  background-color: ${(props) => (props.active ? "#000000" : "white")};
  color: ${(props) => (props.active ? "white" : "#000000")};
  border-radius: 50%;
  width: 29px;
  height: 29px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  box-shadow: 0px 1px 4px 2px #00000040;
  font-size: 16px;
  font-weight: 600;
  line-height: 18.75px;
`;

const StepperIndicator: React.FC<StepperIndicatorProps> = ({
  currentStep = 1,
}) => {
  return (
    <StepperContainer>
      {steps.map((label, index) => (
        <Step key={index}>
          <StepCircle active={index + 1 === currentStep}>{label}</StepCircle>
        </Step>
      ))}
    </StepperContainer>
  );
};

export default StepperIndicator;
