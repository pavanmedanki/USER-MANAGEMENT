import "react-data-grid/lib/styles.css";

import React from "react";
import DataGrid from "react-data-grid";
import { AllocationData } from "../../constant/allocationdata";
import KpiOneComponent from "../../KPI/kpionecomponent";

const CostAllocation = () => {
  const CostOverViewKpiJson = [
    {
      title: "YTD Cost",
      value: 239,
    },
    {
      title: "Last Month",
      value: 79,
    },
  ];
  return (
    <div className="flex w-full flex-col" style={{ height: "100vh" }}>
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
        Cost Allocation
      </div>
      <div
        style={{
          background: "var(--bg-color)",
          color: "var(--text-color)",
          width: "100%",
          padding: "10px",
        }}
        className="flex flex-col gap-3"
      >
        <div
          className="grid grid-cols-4 gap-3"
          style={{ justifyItems: "left" }}
        >
          {CostOverViewKpiJson?.map((a) => (
            <KpiOneComponent title={a?.title} value={a?.value} />
          ))}
        </div>
        <div className="flex flex-col gap-3 p-5 w-full">
          <DataGrid
            style={{
              height: "100vh",
              padding: "0 10px 0 10px",
            }}
            rowHeight={32}
            headerRowHeight={40}
            columns={AllocationData?.columns}
            rows={AllocationData?.values}
          />
        </div>
      </div>
    </div>
  );
};

export default CostAllocation;
