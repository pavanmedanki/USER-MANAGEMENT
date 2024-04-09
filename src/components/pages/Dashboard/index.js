import React from "react";
import KpiOneComponent from "../../KPI/kpionecomponent";
// import ReactECharts from "echarts-for-react";
import { ChartWidgetComponent } from "../../Widgetcomponent/chartwidget";

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
  const data = [
    {
      count: 1,
      resource_group: "rg-edxi-botx",
    },
    {
      count: 1,
      resource_group: "rg-edxi-cloudprism",
    },
    {
      count: 1,
      resource_group: "rg-edxi-vantagex",
    },
    {
      count: 1,
      resource_group: "rg-ess-compute",
    },
  ];

  const formatChartData = {
    xAxis: data?.map((e) => e.resource_group),
    data: [
      {
        type: "line",
        value: data?.map((e) => e?.count),
      },
    ],
  };

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
      <div
        style={{
          background: "var(--bg-color)",
          color: "var(--text-color)",
          width: "100%",
          padding: "10px",
          overflowY: "scroll",
        }}
        className="flex flex-col gap-3"
      >
        <div className="flex flex-row justify-between gap-3">
          {CostOverViewKpiJson?.map((a) => (
            <KpiOneComponent title={a?.title} value={a?.value} />
          ))}
        </div>

        <div className="flex flex-row justify-between gap-3">
          <div
            style={{
              width: "100%",
              color: "var(--kpi-text)",
              padding: "10px",
            }}
          >
            <ChartWidgetComponent
              type="bar"
              title="Cost Trend (Last 12 Months)"
              isLoading={false}
              color={["#B57432"]}
              userEditAccess={false}
              series={formatChartData}
              // handleRefresh={() => handleRefersh()}
            />
          </div>
          <div
            style={{
              width: "100%",
              color: "var(--kpi-text)",
              padding: "10px",
            }}
          >
            <ChartWidgetComponent
              type="line"
              title="Top 10 P&L (YTD)"
              isLoading={false}
              color={["#77B489"]}
              userEditAccess={false}
              series={formatChartData}
              // handleRefresh={() => handleRefersh()}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between gap-3">
          <div
            style={{
              width: "100%",
              padding: "10px",
              color: "var(--kpi-text)",
            }}
          >
            <ChartWidgetComponent
              type="pie"
              title="CTop 10 Division (YTD)"
              isLoading={false}
              color={[
                "#77B489",
                "#008080",
                "#2E85D9",
                "#A78029",
                "#BBABA0",
                "#CCC589",
                "#82A66C",
                "#63BDF6",
                "#D7BE82",
              ]}
              userEditAccess={false}
              series={formatChartData}
              // handleRefresh={() => handleRefersh()}
            />
          </div>
          <div
            style={{
              width: "100%",
              padding: "10px",
              color: "var(--kpi-text)",
            }}
          >
            <ChartWidgetComponent
              type="bar"
              title="Top 10 Cost By Project (YTD)"
              isLoading={false}
              color={["#2E85D9"]}
              userEditAccess={false}
              series={formatChartData}
              // handleRefresh={() => handleRefersh()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
