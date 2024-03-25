import React from "react";
// import LandingKpi from "./kpi";
import KpiOneComponent from "../../KPI/kpionecomponent";

const Dashboard = () => {
  const CostOverViewKpiJson = [
    {
      title: "YTD Cost",
      value: 239,
    },
    {
      title: "Last Month",
      value: 79,
    },
    {
      title: "MTD",
      value: 88,
    },
    {
      title: "Active Accounts",
      value: 56,
    },
  ];
  return (
    <div className="flex h-full w-full flex-col" style={{ height: "100vh" }}>
      <div
        style={{
          height: "50px",
          background: "var(--bg-color)",
          color: "var(--text-color)",
          display: "flex",
          alignItems: "center",
          padding: "10px",
          borderBottom: "1px solid var(--header-border)",
        }}
      >
        Executive Dashboard
      </div>
      {/* <div
        style={{ height: "55px", background: "var(--sidebar-bg-color)" }}
      ></div> */}
      <div
        style={{
          // height: "calc(100vh - 130px)",
          background: "var(--bg-color)",
          color: "var(--text-color)",
          width: "100%",
          // gap: "10px",
          padding: "10px",
          overflowY: "scroll",
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-row justify-between gap-3">
          {CostOverViewKpiJson?.map((a) => (
            <div
              style={{
                height: "140px",
                width: "100%",
                background: "var(--kpi-bg)",
                color: "var(--kpi-text)",
              }}
            >
              <KpiOneComponent title={a?.title} value={a?.value} />
            </div>
          ))}
        </div>

        <div className="flex flex-row justify-between gap-3">
          <div
            style={{
              width: "100%",
              height: "330px",
              background: "var(--kpi-bg)",
              color: "var(--kpi-text)",
              padding: "10px",
            }}
          >
            {/* <LineChartComponent /> */}
          </div>
          <div
            style={{
              width: "100%",
              height: "330px",
              background: "var(--kpi-bg)",
              color: "var(--kpi-text)",
              padding: "10px",
            }}
          >
            {/* <BarChartComponent /> */}
          </div>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div
            style={{
              width: "100%",
              height: "330px",
              padding: "10px",
              background: "var(--kpi-bg)",
              color: "var(--kpi-text)",
            }}
          >
            {/* <RaderChartComponent /> */}
          </div>
          <div
            style={{
              width: "100%",
              height: "330px",
              padding: "10px",
              background: "var(--kpi-bg)",
              color: "var(--kpi-text)",
            }}
          >
            {/* <DynamicBarComponent /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
