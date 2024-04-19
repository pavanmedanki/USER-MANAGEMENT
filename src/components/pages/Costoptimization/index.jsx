import "react-data-grid/lib/styles.css";

import React from "react";
import DataGrid from "react-data-grid";
import { CostOptimizationData } from "../../constant/optimizationData";
import { ChartWidgetComponent } from "../../Widgetcomponent/chartwidget";
import KpiOneComponent from "../../KPI/kpionecomponent";
import { CostOptimizationWidget } from "../../constant/chartconstant";

const CostOptimization = () => {
  const CostOverViewKpiJson = [
    {
      title: "Active Potential Savings",
      value: "$9136.5",
    },
    {
      title: "Active Opportunities",
      value: 39959,
    },
  ];
  const Statuswidgetdata = {
    xAxis: CostOptimizationWidget?.data?.x_axis,
    data: [
      {
        name: CostOptimizationWidget?.data?.series?.at(0)?.name,
        type: "line",
        value: CostOptimizationWidget?.data?.series
          ?.map((a) => a?.values)
          ?.at(0),
      },
    ],
  };
  return (
    <div
      className="flex h-full w-full flex-col gap-4"
      style={{ height: "100vh" }}
    >
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
        Cost Optimization
      </div>
      <div className="flex space-x-4 w-full">
        <div style={{ width: "70%" }}>
          <DataGrid
            style={{
              height: "100vh",
              padding: "0 10px 0 10px",
            }}
            rowHeight={32}
            headerRowHeight={40}
            columns={CostOptimizationData?.columns}
            rows={CostOptimizationData?.values}
          />
        </div>
        <div
          style={{
            width: "30%",
            height: "calc(100vh - 52px)",
            overflowY: "auto",
          }}
        >
          <div className="grid gap-4 grid-rows-2">
            {CostOverViewKpiJson?.map((a) => (
              <KpiOneComponent title={a?.title} value={a?.value} />
            ))}
          </div>
          <div
            style={{
              width: "100%",
              color: "var(--kpi-text)",
              padding: "10px",
            }}
          >
            <ChartWidgetComponent
              type="donut"
              title="Status"
              isLoading={false}
              color={["#A78029", "#008080", "#D7BE82"]}
              userEditAccess={false}
              series={Statuswidgetdata}
              // handleRefresh={() => handleRefersh()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostOptimization;
