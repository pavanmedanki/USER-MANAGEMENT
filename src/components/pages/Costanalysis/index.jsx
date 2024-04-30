import "react-data-grid/lib/styles.css";

import React from "react";
import DataGrid from "react-data-grid";
import {
  IconChevronLeft,
  IconChevronLeftPipe,
  IconChevronRight,
  IconChevronRightPipe,
} from "@tabler/icons-react";
import {
  Top10CostbyGroup,
  TopcontributorsbyGroup,
} from "../../constant/chartconstant";
import { analysisData } from "../../constant";
import KpiOneComponent from "../../KPI/kpionecomponent";
import { ChartWidgetComponent } from "../../Widgetcomponent/chartwidget";

const CostAnalysis = () => {
  const columnsdata = React.useMemo(() => {
    return analysisData?.columns?.map((a) => ({
      ...a,
      resizable: true,
      sortable: true,
      width: "fit-content",
    }));
  }, []);
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
  const [currentPage, setCurrentPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(12);

  const totalRows = analysisData?.values?.length;
  const totalPages = Math.ceil(totalRows / pageSize);

  const startRecords = currentPage * pageSize - (pageSize - 1);
  const endRecords =
    currentPage === totalPages ? totalRows : pageSize * currentPage;

  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  const paginatedRows = analysisData?.values.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  console.log(currentPage, "currentPage");
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
        <div style={{ width: "70%", height: "calc(100vh - 58px)" }}>
          <DataGrid
            style={{
              height: "450px",
              padding: "0 10px 0 10px",
            }}
            rowHeight={32}
            headerRowHeight={40}
            columns={columnsdata}
            rows={paginatedRows}
          />
          <div className="flex justify-between w-100 p-2">
            <div className="pt-8 text-sm tracking-normal text-gray-500 font-semibold">
              <span>{`Showing ${currentPage === 1 ? 1 : startRecords} to ${
                totalRows === analysisData?.values?.length
                  ? totalRows
                  : endRecords
              } of ${totalRows} entries`}</span>
            </div>
            <div className="pt-6">
              <button
                disabled={currentPage === 1 || totalRows <= pageSize}
                onClick={() => onPageChange(1)}
                className="cursor-pointer"
                aria-label="First Page"
              >
                <IconChevronLeftPipe size={18} color="#6c717c" />
              </button>
              <button
                disabled={currentPage === 1 || totalRows <= pageSize}
                onClick={() => onPageChange(currentPage - 1)}
                className="cursor-pointer"
                aria-label="Previous Page"
              >
                <IconChevronLeft size={18} color="#6c717c" />
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="cursor-pointer"
                aria-label="Next Page"
              >
                <IconChevronRight size={18} color="#6c717c" />
              </button>
              <button
                disabled={currentPage === totalPages || totalRows <= pageSize}
                onClick={() => onPageChange(totalPages)}
                className="cursor-pointer"
                aria-label="Last Page"
              >
                <IconChevronRightPipe size={18} color="#6c717c" />
              </button>
            </div>
          </div>
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
