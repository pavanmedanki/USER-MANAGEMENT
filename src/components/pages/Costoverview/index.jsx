import React from "react";
import KpiOneComponent from "../../KPI/kpionecomponent";
import {
  costTrend,
  costByCostCenter,
  costbyProducts,
} from "../../constant/chartconstant";
import { ChartWidgetComponent } from "../../Widgetcomponent/chartwidget";

const CostOverview = () => {
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
  const costTrendData = {
    xAxis: costTrend?.data?.x_axis,
    data: [
      {
        name: costTrend?.data?.series?.at(0)?.name,
        type: "line",
        value: costTrend?.data?.series?.map((a) => a?.values)?.at(0),
      },
    ],
  };
  const costbyCostCenterData = {
    xAxis: costByCostCenter?.data?.x_axis,
    data: [
      {
        type: "line",
        value: costByCostCenter?.data?.series?.at(0)?.values,
      },
    ],
  };
  const costbyProductsData = {
    xAxis: costbyProducts?.data?.x_axis,
    data: [
      {
        type: "line",
        value: costbyProducts?.data?.series?.at(0)?.values,
      },
    ],
  };
  console.log(costByCostCenter?.data?.series?.at(0)?.values, "costTrend");

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
        Cost Overview
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
              type="area"
              title="Cost Trend"
              isLoading={false}
              color={[
                "#2E85D9",
                "#A78029",
                "#BBABA0",
                "#CCC589",
                "#82A66C",
                "#63BDF6",
                "#77B489",
                "#008080",
                "#D7BE82",
              ]}
              userEditAccess={false}
              series={costTrendData}
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
              type="stack bar"
              title="Cost Trend by Group"
              isLoading={false}
              color={[
                "#2E85D9",
                "#A78029",
                "#BBABA0",
                "#CCC589",
                "#82A66C",
                "#63BDF6",
                "#77B489",
                "#008080",
                "#D7BE82",
              ]}
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
              type="horizontal"
              title="Cost by Cost Center"
              isLoading={false}
              color={[
                "#2E85D9",
                "#A78029",
                "#BBABA0",
                "#CCC589",
                "#82A66C",
                "#63BDF6",
                "#77B489",
                "#008080",
                "#D7BE82",
              ]}
              isdataZoom={true}
              userEditAccess={false}
              series={costbyCostCenterData}
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
              type="horizontal"
              title="Cost by Product"
              isdataZoom={true}
              isLoading={false}
              color={["#A78029"]}
              userEditAccess={false}
              series={costbyProductsData}
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
              type="horizontal"
              title="Cost by Account by Products"
              isLoading={false}
              color={[
                "#CCC589",
                "#82A66C",
                "#63BDF6",
                "#77B489",
                "#008080",
                "#D7BE82",
              ]}
              userEditAccess={false}
              isdataZoom={true}
              series={formatChartData}
              // handleRefresh={() => handleRefersh()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostOverview;
