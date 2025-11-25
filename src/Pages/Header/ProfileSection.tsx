import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import ProfileIcon from "../../Assets/profileDummy.webp";

import { AiOutlineLogout } from "react-icons/ai";

import { ClearSession, GetSession } from "../../Lib/Session";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetOrgDetails } from "../../Redux/Api/Authentication/action";

import { IoSettingsOutline } from "react-icons/io5";
import { IoIosHelpCircleOutline } from "react-icons/io";

const ProfileSection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const SessionData = GetSession();
  const OrgResponse = useSelector(
    (state: any) => state.LoginReducer.GetOrgDetailsRes
  );

  useEffect(() => {
    if (SessionData?.user?.organizationId) {
      dispatch(GetOrgDetails(SessionData?.user?.organizationId) as any);
    }
  }, [SessionData?.user?.organizationId]);

  const HandleLogout = () => {
    ClearSession();
    navigate("/");
  };

  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="img"
        src={ProfileIcon}
        alt="Profile Icon"
        className="profile-icon"
        style={{ borderRadius: "50%", width: "40px", height: "40px" }}
      />

      <ProfileDropdown>
        <ProfileHeader>
          <ProfileIconWrapper>
            <img
              src={ProfileIcon}
              alt="Profile"
              style={{ borderRadius: "50%", width: "40px", height: "40px" }}
            />
          </ProfileIconWrapper>
          <div className=" d-flex justify-content-center flex-column  align-items-start">
            <MainHeading>
              {SessionData?.user?.firstname + " " + SessionData?.user?.lastname}
            </MainHeading>
            <UserEmail>{SessionData?.username}</UserEmail>
          </div>
        </ProfileHeader>
        <Divider />
        <ProfileDetails>
          <OptionList>
            <OptionItem>
              <IoSettingsOutline size={18} />
              <span>Account Settings</span>
            </OptionItem>
            <OptionItem>
              <IoIosHelpCircleOutline size={18} />
              <span>Help center</span>
            </OptionItem>
            <OptionTexts>
              <span>Org Name</span>
              <span className="sub">{OrgResponse?.orgName}</span>
            </OptionTexts>
            <OptionTexts>
              <span>Org GstIn No</span>
              <span className="sub">{OrgResponse?.orgGstinNumber}</span>
            </OptionTexts>
          </OptionList>

          <Divider />

          <div className=" w-100 d-flex align-items-start justify-content-start">
            <OptionItem onClick={HandleLogout}>
              <AiOutlineLogout size={20} />
              <span>Logout</span>
            </OptionItem>
          </div>
        </ProfileDetails>
      </ProfileDropdown>
    </Dropdown>
  );
};

export const ProfileDropdown = styled(Dropdown.Menu)`
  width: 300px;
  border-radius: 22px;
  box-shadow: 1px 2px 79px 0px #00000026;
  padding: 0.5rem 1rem;
  font-family: "Poppins";
  overflow: hidden;
  border: none;
`;

const ProfileHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 20px;
  background-size: cover;
  background-position: center;
  border-top-left-radius: 22px;
  border-top-right-radius: 22px;
`;

const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProfileIconWrapper = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 2;
  background-color: white;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;

const EditIconWrapper = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #652ae2;
  cursor: pointer;
  right: 20px;
  top: 20px;

  img {
    width: 16px;
    height: 16px;
  }
`;

export const MainHeading = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 24.68px;
  color: #000000;
`;

const UserEmail = styled.div`
  font-size: 13px;
  line-height: 15.28px;
  color: #646464;
`;

const OptionList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 15px;
`;

const OptionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 20px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  &:hover {
    background-color: #eff5f6;
  }
`;
const OptionTexts = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 15px;
  border-radius: 12px;
  font-size: 14px;
  font-weight: 400;
  color: #000;
  cursor: pointer;
  transition: background 0.2s ease-in-out;

  background-color: #f0f0f0;

  .sub {
    color: #646464;
    font-size: 14px;
    font-weight: 400;
  }
`;
const DarkSwitch = styled.input`
  appearance: none;
  width: 34px;
  height: 20px;
  background: #ccc;
  border-radius: 20px;
  position: relative;
  outline: none;
  cursor: pointer;
  transition: background 0.3s;

  &::before {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 16px;
    height: 16px;
    background: #fff;
    border-radius: 50%;
    transition: 0.3s;
  }

  &:checked {
    background: #1d1d1d;
  }

  &:checked::before {
    transform: translateX(14px);
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #eaeaea;
  margin-bottom: 10px;
`;

export default ProfileSection;
