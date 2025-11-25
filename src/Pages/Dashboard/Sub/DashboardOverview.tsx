// Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";

import MostSoldChart from "./MostSoldChart";
import SalesGraphChart from "./SalesGraphChart";
import ReorderBarChart from "./ReorderBarChart";
import ContentHeading from "../../../Components/Headings/ContentHeading";
import DateRangePicker2 from "../../../Components/Date Rage PIcker/DateRangePickerNew";
import IconButton from "../../../Components/Buttons/Icon Button/IconButton";
import { IoIosRefresh } from "react-icons/io";
import {
  DashboardCards,
  MostSoldChartContainer,
  SalesChartContainer,
} from "./DashboardStyles";
import CardIcon1 from "../../../Assets/Dashboard Icons/icon-1.png";
import CardIcon2 from "../../../Assets/Dashboard Icons/icon-2.png";
import CardIcon3 from "../../../Assets/Dashboard Icons/icon-3.png";
import { MainContainer } from "../../../Styles/CommonStyles";
import { useDispatch, useSelector } from "react-redux";
import { GetSession } from "../../../Lib/Session";
import {
  GetDashboardCard,
  GetMostSellingGraph,
  GetSalesGraph,
} from "../../../Redux/Api/Dashboard/action";

const DoughnutmonthData = [
  { label: "Pencils", value: 30, color: "#3B82F6" },
  { label: "Protractors", value: 45, color: "#10B981" },
  { label: "Educational software", value: 0, color: "#EF4444" },
  { label: "Computers", value: 25, color: "#D1D5DB" },
  { label: "Calculators", value: 0, color: "#06B6D4" },
  { label: "Compass", value: 0, color: "#A855F7" },
];

const DoughnutweekData = [
  { label: "Pencils", value: 10, color: "#3B82F6" },
  { label: "Protractors", value: 12, color: "#10B981" },
  { label: "Computers", value: 8, color: "#D1D5DB" },
];

const LinemonthData = [
  { label: "Jan", value: 25 },
  { label: "Feb", value: 33 },
  { label: "Mar", value: 35 },
  { label: "Apr", value: 37 },
  { label: "May", value: 80 },
  { label: "Jun", value: 80 },
  { label: "Jul", value: 70 },
  { label: "Aug", value: 70 },
];

const LineweekData = [
  { label: "Mon", value: 30 },
  { label: "Tue", value: 40 },
  { label: "Wed", value: 50 },
  { label: "Thu", value: 45 },
  { label: "Fri", value: 35 },
  { label: "Sat", value: 60 },
  { label: "Sun", value: 55 },
];

const reorderData = [
  { label: "Note Book", value: 8500, color: "#EF4444" }, // red
  { label: "Pencil", value: 12000, color: "#FACC15" }, // yellow
  { label: "Pen", value: 8200, color: "#EF4444" }, // red
  { label: "Markers", value: 8000, color: "#374151" }, // gray
];
const today = new Date();
const fifteenDaysAgo = new Date();
fifteenDaysAgo.setDate(today.getDate() - 15);

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const SessionData = GetSession();

  const [salesGraphView, setSalesGraphView] = useState<"Month" | "Week">(
    "Month"
  );
  const [mostSellingGraphView, setMostSellingGraphView] = useState<
    "Month" | "Week"
  >("Month");
  const [startDate, setStartDate] = useState<Date | null>(fifteenDaysAgo);
  const [endDate, setEndDate] = useState<Date | null>(today);

  const DashboardCardResponse: any = useSelector(
    (state: any) => state.DashboardReducers.GetDashboardCardRes
  );
  const SalesChartResponse: any = useSelector(
    (state: any) => state.DashboardReducers.GetSalesGraphRes
  );
  const MostSellingChartResponse: any = useSelector(
    (state: any) => state.DashboardReducers.GetMostSellingGraphRes
  );

  const Card1 = Array.isArray(DashboardCardResponse)
    ? DashboardCardResponse[0] || ""
    : "";
  const Card2 = Array.isArray(DashboardCardResponse)
    ? DashboardCardResponse[1] || ""
    : "";
     const Card3 = Array.isArray(DashboardCardResponse)
    ? DashboardCardResponse[2] || ""
    : "";

  useEffect(() => {
    dispatch(
      GetDashboardCard({
        org_id: SessionData?.user?.organizationId,
      }) as any
    );
  }, []);
  useEffect(() => {
    dispatch(
      GetSalesGraph({
        org_id: SessionData?.user?.organizationId,
        type: salesGraphView,
      }) as any
    );
  }, [salesGraphView]);
  useEffect(() => {
    dispatch(
      GetMostSellingGraph({
        org_id: SessionData?.user?.organizationId,
        type: mostSellingGraphView,
      }) as any
    );
  }, [mostSellingGraphView]);
  useEffect(() => {
    console.log("DashboardCardResponse", DashboardCardResponse);
  }, [DashboardCardResponse]);

  return (
    <MainContainer>
      <div className="d-flex justify-content-between mb-3">
        <ContentHeading marginTop="10px">Dashboard</ContentHeading>

        {/* <div className="d-flex gap-3">
          <DateRangePicker2
            startDate={startDate}
            endDate={endDate}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
          />
          <div>
            <IconButton icon={IoIosRefresh} iconColor="" padding="0.6em">
              Refresh
            </IconButton>
          </div>
        </div> */}
      </div>

      <Row className="mb-3">
        <Col md={6}>
          <div>
            <Row className="mb-3">
              <Col md={4}>
                <DashboardCards>
                  <div className="d-flex gap-2 align-items-center mb-2">
                    <img className="card-icon" src={CardIcon1} alt="" />
                    <h5 className="titles">{Card1?.name}</h5>
                  </div>
                  <div className="d-flex ">
                    <h1>{Card1?.value}</h1>
                    {/* <span className="sub-text">customers</span> */}
                  </div>
                </DashboardCards>
              </Col>

              <Col md={4}>
                <DashboardCards>
                  <div className="d-flex gap-2 align-items-center mb-2">
                    <img className="card-icon" src={CardIcon2} alt="" />
                    <h5 className="titles">{Card2.name}</h5>
                  </div>
                  <div className="d-flex">
                    <h1>{Card2?.value}</h1>
                    {/* <span className="sub-text">%</span> */}
                  </div>
                </DashboardCards>
              </Col>

              <Col md={4}>
                <DashboardCards>
                  <div className="d-flex gap-2 align-items-center mb-2">
                    <img className="card-icon" src={CardIcon3} alt="" />
                    <h5 className="titles">{Card3.name}</h5>
                  </div>
                  <div className="d-flex">
                    <h1>{Card3.value}</h1>
                    {/* <span className="sub-text">vendors</span> */}
                  </div>
                </DashboardCards>
              </Col>
            </Row>
            <SalesChartContainer>
              {SalesChartResponse && (
                <SalesGraphChart
                  data={SalesChartResponse || ""}
                  view={salesGraphView}
                  setView={setSalesGraphView}
                />
              )}
            </SalesChartContainer>
          </div>
        </Col>
        <Col md={6}>
          {" "}
          <MostSoldChartContainer>
            {MostSellingChartResponse && (
              <MostSoldChart
                data={MostSellingChartResponse || ""}
                view={mostSellingGraphView}
                setView={setMostSellingGraphView}
              />
            )}
          </MostSoldChartContainer>
        </Col>
      </Row>

      {/* <div>
        <ReorderBarChart data={reorderData} itemsBelowReorder={3} />
      </div> */}
    </MainContainer>
    // <div>
    //   Dashboard
    // </div>
  );
};

export default Dashboard;
