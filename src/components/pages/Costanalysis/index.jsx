import "react-data-grid/lib/styles.css";

import React from "react";
import DataGrid from "react-data-grid";
import {
  Top10CostbyGroup,
  TopcontributorsbyGroup,
} from "../../constant/chartconstant";
import { analysisData } from "../../constant";
import KpiOneComponent from "../../KPI/kpionecomponent";
import { ChartWidgetComponent } from "../../Widgetcomponent/chartwidget";

const CostAnalysis = () => {
  const CostOverViewKpiJson = [
    {
      title: "Total Net Unblended Cost (inclusive credit)",
      value: "$666910.97",
    },
    {
      title: "Credits Applied",
      value: "$57",
    },
  ];
  const TopCostbyGroup = {
    xAxis: Top10CostbyGroup?.data?.x_axis,
    data: [
      {
        name: Top10CostbyGroup?.data?.series?.at(0)?.name,
        type: "line",
        value: Top10CostbyGroup?.data?.series?.map((a) => a?.values)?.at(0),
      },
    ],
  };
  const Topcontributers = {
    xAxis: TopcontributorsbyGroup?.data?.x_axis,
    data: [
      {
        name: TopcontributorsbyGroup?.data?.series?.at(0)?.name,
        type: "line",
        value: TopcontributorsbyGroup?.data?.series
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
        Cost Analysis
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
            columns={analysisData?.columns}
            rows={analysisData?.values}
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
              title="Top 10 Cost by Group"
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
              series={TopCostbyGroup}
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
              type="bar"
              title="Top contributors by Group"
              isLoading={false}
              color={["#2E85D9"]}
              userEditAccess={false}
              series={Topcontributers}
              // handleRefresh={() => handleRefersh()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostAnalysis;
