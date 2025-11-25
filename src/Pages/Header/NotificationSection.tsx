import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import styled from "styled-components";
import BellIcon from "../../Assets/Bell.png";
import BellIconActive from "../../Assets/BellIconActive.png";
import { MainHeading, ProfileDropdown } from "./ProfileSection";
import { MdClose } from "react-icons/md";
import ProfileIcon from "../../Assets/profileDummy.webp";

const notifications = [
  {
    id: 1,
    message: "Brand New Bike, Local buyer only",
    details: "Claim request rejected from admin",
    time: "Now",
    icon: ProfileIcon
  },
  {
    id: 2,
    message: "Brand New Bike, Local buyer only",
    details: "Claim request rejected from admin",
    time: "Now",
    icon: ProfileIcon
  },
  {
    id: 3,
    message: "Brand New Bike, Local buyer only",
    details: "Claim request rejected from admin",
    time: "Now",
    icon: ProfileIcon
  },
  {
    id: 4,
    message: "Brand New Bike, Local buyer only",
    details: "Claim request rejected from admin",
    time: "Now",
    icon: ProfileIcon
  },
  {
    id: 5,
    message: "Brand New Bike, Local buyer only",
    details: "Claim request rejected from admin",
    time: "Now",
    icon: ProfileIcon
  },
];

const NotificationSection = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  return (
    <Dropdown align="end" show={show} onToggle={(nextShow) => setShow(nextShow)}>
      <Dropdown.Toggle
        as="img"
        src={show ? BellIconActive : BellIcon}
        alt="Notification Icon"
        className="icon bell-icon"
        onClick={() => setShow(!show)} // Toggle dropdown on icon click
      />

      <ProfileDropdown show={show}>
        <NotificationHeader className="p-4">
          <MainHeading>Notification</MainHeading>
          <MdClose size={24} color="#DE3A3B" onClick={() => setShow(false)} /> {/* Close dropdown */}
        </NotificationHeader>
        <div className="d-flex flex-column">
          {notifications?.map(({ id, message, details, time, icon }) => (
            <SingleNotification key={id} className="px-4 py-3">
              <div className="d-flex gap-2">
                <img src={icon} alt="Profile" />
                <div className="message">
                  <span>{message}</span> {details}
                </div>
                <NotificationTime>{time}</NotificationTime>
              </div>
            </SingleNotification>
          ))}
        </div>
      </ProfileDropdown>
    </Dropdown>
  );
};

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg{
    cursor: pointer;
  }
`;

const SingleNotification = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 0.5px solid #bfbfbf;
  font-family: "Public Sans";
  img {
    width: 36px;
    height: 36px;
  }
  .message {
    font-size: 13px;
    font-weight: 400;
    line-height: 21px;
    span {
      font-weight: 700;
    }
  }
`;

const NotificationTime = styled.div`
  display: flex;
  align-items: end;
  font-size: 12px;
  line-height: 14.1px;
  color: #9E9E9E;
`;

export default NotificationSection;
