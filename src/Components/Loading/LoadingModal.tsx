import { Icon } from "@iconify/react/dist/iconify.js";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import styled from "styled-components";

function LoadingModal() {
 const isLoading = useSelector((state: any) => state.loading.isLoading);

  if (!isLoading) return null;

  return (
    <Overlay>
      <Icon icon="eos-icons:bubble-loading" width="97" height="97" style={{ color: "#215073" }} />
      <MessageDiv>This may take few minutes</MessageDiv>
      <WarningDiv>
        Note: Do not refresh, close, or click the back button. Your data might be lost.
      </WarningDiv>
    </Overlay>
  )
}
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

const MessageDiv = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #215073;
`;

const WarningDiv = styled.div`
  font-size: 0.9rem;
  color: #b22222;
  text-align: center;
  max-width: 300px;
`;
export default LoadingModal;
