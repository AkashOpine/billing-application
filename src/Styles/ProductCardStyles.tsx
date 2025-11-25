import styled from "styled-components";

export const Card = styled.div`
  width: 210px;
  border: 1px solid #b9b9b9;
  border-radius: 16px;
  padding: 8px;
  text-align: center;
  background: #fff;
  transition: transform 0.2s;
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

export const CardImage = styled.img`
  width: 80px;
  height: 110px;
  object-fit: cover;
  border-radius: 8px;
`;

export const CardTitle = styled.div`
  font-size: 16px;
  margin: 5px 0;
  font-weight: 500;
  text-align: left;
`;

export const CardPrice = styled.div`
  font-size: 14px;
  font-weight: 800;
  margin-bottom: 10px;
  text-align: left;
  span {
    color: #ff6868;
  }
`;

export const CardButton = styled.button`
  padding: 3px 12px;
  border: 1px solid #0539f4;
  color: #005eff;
  background: transparent;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &:hover {
    background-color: #e6f0ff;
  }
`;
