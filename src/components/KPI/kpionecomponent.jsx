import React from "react";

const KpiOneComponent = ({ title, value }) => {
  return (
    <div
      className="flex flex-col w-full h-full p-3"
      style={{
        border: "1px",
        borderRadius: "10px",
        background: "var(--kpi-bg)",
        color: "var(--kpi-text)",
      }}
    >
      <div
        style={{
          height: "20%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {title}
      </div>
      <div
        style={{
          height: "80%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontWeight: "400",
          fontSize: "xx-large",
        }}
      >
        {value}
      </div>
    </div>
  );
};

export default KpiOneComponent;
