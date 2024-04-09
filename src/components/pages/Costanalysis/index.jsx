import "react-data-grid/lib/styles.css";

import React from "react";
import DataGrid from "react-data-grid";
import { analysisData } from "../../constant";

const CostAnalysis = () => {
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
        Cost Analysis
      </div>
      <div className="flex flex-col gap-3 p-5" style={{ width: "70%" }}>
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
    </div>
  );
};

export default CostAnalysis;
