import ReactEcharts from "echarts-for-react";
import PropTypes from "prop-types";
import React from "react";
import Popup from "reactjs-popup";
import {
  AreaChartSvg,
  BarChartSvg,
  DoughNutChartSvg,
  HorizontalChartSvg,
  LineBarChart,
  LineChartSvg,
  PieChartSvg,
  Loader,
  getBytesConversion,
  RiFolderChartFill,
} from "../Assets/icons";
import { WidgetComponent } from "./index";
import { allChartColors } from "./chartColor";

export const chartTypes = [
  "area",
  "line",
  "bar",
  "line & bar",
  "pie",
  "donut",
  "horizontal",
  "stack bar",
];
let customChartTypes = chartTypes;

const isMono = localStorage.getItem("monoChrome") === "true";

export const ChartWidgetComponent = (props) => {
  const {
    color,
    renderAs: renderer,
    yAxis,
    series,
    type,
    displayCount,
    isdataZoom,
    config,
    isLoading = false,
    isError = false,
    onEvents,
    hasTopLabels = true,
    rotateXAxisLabel = 0,
    rotateYAxisLabel = 0,
    min,
    max,
    restrictChart = undefined,
    chartMinHeight = "300px",
    isPieLabelVisible = true,
    radiusLevel,
    formatter = undefined,
    noDataText = "No Data",
    chartAnimation,
    dataoptions,
    onSelectDrop,
    selectDropIndex,
    axisLabelDecimalPoint,
    displayCountHorizontal,
    monoColors,
    pieDLegends = false,
    customizeYaxiswithStorage = false,
    dataTestId,
    stackBarTotalCount,
    tableValue,
    newChartType = false,
  } = props;

  if (restrictChart) {
    customChartTypes = restrictChart;
  } else {
    customChartTypes = chartTypes;
  }

  const defaultOptions = {
    color: isMono ? monoColors : color,
    xAxis: {
      type: "category",
      showGrid: false,
      boundaryGap: true,
      axisTick: {
        alignWithLabel: true,
      },
      axisLine: {
        lineStyle: {
          color: "#999",
        },
      },
      axisLabel: {
        rotate: rotateXAxisLabel,
      },
      splitLine: {
        show: false,
      },
      data: [],
    },
    yAxis: {
      type: "value",
      showGrid: false,
      axisTick: {
        show: true,
      },

      axisLine: {
        show: true,
        lineStyle: {
          color: "#999",
        },
      },
      axisLabel: {
        rotate: rotateYAxisLabel,
      },
      splitLine: {
        show: false,
      },
    },
    grid: {
      left: "6%",
      right: "5%",
      bottom: "10%",
      top: hasTopLabels ? "30px" : "15px",
      containLabel: true,
    },
    legend: {
      show: true,
      type: "scroll",
      icon: "roundRect",
      bottom: 10,
      itemGap: 16,
      itemHeight: 8,
      itemWidth: 8,
      itemStyle: {
        borderDashOffset: 10,
      },
      textStyle: {
        fontSize: 14,
        color: "#999",
      },
    },
    tooltip: {},
    series: [],
    label: {
      show: false,
      position: "top",
      color: pieDLegends ? "#fff" : "#999",
    },
  };

  let configWrap = {
    refresh: true,
    chart: true,
    mail: true,
    fileDownload: true,
    screenMax: true,
    dataView: false,
    ...config,
  };

  const node = React.useRef();
  const [chartType, setChartType] = React.useState(type);
  const dataZoom = [
    {
      start: 0,
      end: 100,
      zoomLock: true,
      id: "dataZoomY",
      type: "slider",
      yAxisIndex: [0],
      filterMode: "filter",
      show: true,
    },
  ];
  const [chartOptions, setChartOptions] = React.useState({
    ...defaultOptions,
    yAxis:
      yAxis && Array.isArray(yAxis)
        ? [...yAxis.map((y) => ({ ...defaultOptions.yAxis, ...y }))]
        : { ...defaultOptions.yAxis },
    series,
    dataZoom: isdataZoom ? dataZoom : [],
  });

  const [isChartOption, setIsChartOption] = React.useState(false);
  const [chartOptionPopup, setChartOptionPopup] = React.useState(false);
  const [pieIndex, setPieIndex] = React.useState(0);

  const handleChartClick = (e) => {
    if (node?.current?.contains(e.target)) {
      return;
    }
    setIsChartOption(false);
  };

  React.useEffect(() => {
    document.addEventListener("mousedown", handleChartClick);
    return () => {
      document.removeEventListener("mousedown", handleChartClick);
    };
  }, []);

  React.useEffect(() => {
    let getChartOptions = chartOptions;
    const isPieChart = ["pie", "donut"].includes(chartType);
    const isLineChart = ["line", "area"].includes(chartType);
    const type =
      !isChartOption && newChartType
        ? newChartType
        : isLineChart
        ? "line"
        : isPieChart
        ? "pie"
        : chartType === "horizontal"
        ? "bar"
        : chartType;

    let chartData = [];
    // let tmpLineLables = [];
    // let tmpBarLables = [];
    let chartLableShow = false;

    let disPlayCount = ["bar", "area", "line", "line & bar", "stack bar"];
    const disPlayCountPie = ["pie", "donut"];
    if (displayCount) {
      if (displayCountHorizontal) {
        disPlayCount = [...disPlayCount, "horizontal"];
      }

      if (chartType === "horizontal" && series?.data?.length <= 1) {
        chartLableShow = true;
      } else chartLableShow = false;

      if (chartType !== "horizontal") {
        chartLableShow = true;
      }
    }

    if (isPieChart) {
      chartData = [
        {
          name: series?.data && series?.data[pieIndex]?.name,
          type,
          label: {
            show: false,
            // position: disPlayCountPie?.includes(chartType) ? "outside" : "top",
            // formatter:
            //   displayCount &&
            //   disPlayCountPie?.includes(chartType) &&
            //   "{b} ({c})",
          },
          labelLine: {
            show: false,
          },
          radius: chartType === "pie" ? "60%" : radiusLevel,
          avoidLabelOverlap: true,
          itemStyle: chartType !== "pie" && {
            borderRadius: 10,
            // borderColor: "var(--bg-color)",
            // borderWidth: 2,
          },
          data:
            series?.data &&
            series?.data[pieIndex]?.value?.map((val, i) => ({
              name: `${series.xAxis[i]}`,
              value: val,
              count: series?.count ? `${series?.count[i]}` : "",
            })),
          animation: chartAnimation,
        },
      ];
      if (formatter) {
        chartData = [
          {
            ...chartData[0],
            label: {
              ...chartData[0]?.label,
              formatter: formatter,
              minMargin: 5,
              edgeDistance: 10,
              lineHeight: 15,
            },
          },
        ];
      }
    } else {
      chartData = series?.data?.map((item, i) => {
        // if (item.type === 'bar') {
        //     tmpBarLables.push(item.name);
        // }
        // if (item.type === 'line') {
        //     tmpLineLables.push(item.name);
        // }
        let seriess = {
          name: item.name,
          data: item.value,
          // data: series?.data[pieIndex]?.value?.map((val, i) => ({
          //     name: `${series.xAxis[i]}`,
          //     value: val,
          //     count: series?.count ? `${series?.count[i]}` : '',
          // })),
          // count: series?.count ? `${series?.count[i]}` : '',
          // type: chartType === 'line' || chartType === 'bar' ? tmpChartType : type,
          type: chartType === "line & bar" ? item.type : type,
          label:
            disPlayCount?.includes(chartType) ||
            disPlayCountPie?.includes(chartType)
              ? {
                  show: function (param) {
                    if (param.seriesIndex === 1) {
                      if (stackBarTotalCount) {
                        return param.seriesIndex === 1;
                      } else {
                        return chartLableShow;
                      }
                    } else {
                      return chartLableShow;
                    }
                  },
                  position: disPlayCountPie?.includes(chartType)
                    ? "outside"
                    : chartType === "horizontal"
                    ? "right"
                    : "top",
                  formatter: function (param) {
                    if (param.seriesIndex === chartData.length - 1) {
                      if (stackBarTotalCount) {
                        const valuesSum = chartData.reduce((sum, data) => {
                          const value = data?.data?.[param?.dataIndex] || 0;
                          return sum + value;
                        }, 0);
                        return valuesSum.toString();
                      } else {
                        return param?.data?.value || "";
                      }
                    } else {
                      return "";
                    }
                  },
                }
              : "",

          stack: item?.stack ? item?.stack : "",
          yAxisIndex:
            chartType === "horizontal" || chartType === "pie"
              ? 0
              : item?.yAxisIndex || 0,
          symbolSize: 7,
        };

        if (chartType === "area") seriess.areaStyle = {};
        else if (chartType === "stack bar") {
          seriess.stack = "bar";
          seriess.type = "bar";
        } else if (chartType === "horizontal") {
          seriess.stack = "horizontal";
          seriess.type = "bar";
        }
        return seriess;
      });
    }

    getChartOptions.xAxis = {
      ...defaultOptions.xAxis,
      data: series?.xAxis || [],
      show: isPieChart ? false : true,
      type: chartType === "horizontal" ? "value" : "category",
    };

    if (chartType === "horizontal") {
      getChartOptions.yAxis = {
        ...defaultOptions.yAxis,
        show: isPieChart ? false : true,
        data: chartType === "horizontal" ? series.xAxis : [],
        type: chartType === "horizontal" ? "category" : "value",
        inverse: chartType === "horizontal" ? true : false,
      };
    } else if (chartType === "pie" || chartType === "donut") {
      getChartOptions.yAxis = {
        ...defaultOptions.yAxis,
        show: isPieChart ? false : true,
        data: chartType === "pie" ? series.xAxis : [],
        type: chartType === "pie" ? "category" : "value",
      };
    } else if (yAxis) {
      getChartOptions.yAxis =
        yAxis && Array.isArray(yAxis)
          ? [...yAxis.map((y) => ({ ...defaultOptions.yAxis, ...y }))]
          : { ...defaultOptions.yAxis };
    }

    if (!yAxis || !Array.isArray(yAxis)) {
      getChartOptions.yAxis = {
        ...defaultOptions.yAxis,
        show: isPieChart ? false : true,
        data: chartType === "horizontal" ? series.xAxis : [],
        type: chartType === "horizontal" ? "category" : "value",
        inverse: chartType === "horizontal" ? true : false,
      };

      if ((min || min === 0) && max && chartType !== "horizontal") {
        getChartOptions.yAxis = {
          ...getChartOptions.yAxis,
          min: min,
          max: max,
          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: function (value) {
              let cusValue = value;
              if (axisLabelDecimalPoint) {
                cusValue = parseFloat(value?.toString())?.toFixed(
                  axisLabelDecimalPoint
                );
              } else if (customizeYaxiswithStorage) {
                cusValue = getBytesConversion(value);
              }
              return cusValue;
            },
          },
        };
      }
      if ((min || min === 0) && max && chartType === "horizontal") {
        getChartOptions.xAxis = {
          ...getChartOptions.xAxis,

          min: min,
          max: max,

          splitLine: {
            show: false,
          },
          axisLabel: {
            formatter: function (value) {
              let cusValue = value;
              if (axisLabelDecimalPoint) {
                cusValue = parseFloat(value?.toString())?.toFixed(
                  axisLabelDecimalPoint
                );
              } else if (customizeYaxiswithStorage) {
                cusValue = getBytesConversion(value);
              }

              return cusValue;
            },
          },
        };
      }
    }

    if (customizeYaxiswithStorage && !min && !max) {
      if (chartType === "horizontal") {
        getChartOptions.xAxis = {
          ...getChartOptions.xAxis,
          axisLabel: {
            formatter: function (value) {
              return getBytesConversion(value);
            },
          },
        };
      } else {
        getChartOptions.yAxis = {
          ...getChartOptions.yAxis,
          axisLabel: {
            formatter: function (value) {
              return getBytesConversion(value);
            },
          },
        };
      }
    }

    getChartOptions.tooltip = {
      ...defaultOptions.tooltip,
      trigger: isPieChart ? "item" : "axis",
      className: "chartTooltip",
      textStyle: {
        fontSize: 13,
      },
    };

    if (
      series?.count ||
      series?.unit ||
      axisLabelDecimalPoint ||
      customizeYaxiswithStorage
    ) {
      getChartOptions.tooltip = {
        ...defaultOptions.tooltip,
        formatter: function (params) {
          const getBytesCon = getBytesConversion(params?.value);
          return `<div className="flex flex-col chartTooltip whitespace-nowrap" style="margin: -11px; padding: 10px;border-radius: 4px;border: 1px solid;"> 
                    <div style="font-size:13px;color:#666;font-weight:400;line-height:1;">${
                      params?.seriesName
                    } </div>
                    <div className="flex items-center whitespace-nowrap" style="margin: 10px 0 0;line-height:1;display:flex; white-space:nowrap;align-items:center;">
                    ${params?.marker}
                    ${
                      params?.name
                    } <div style="margin-left:20px; font-weight: 900;">
                     ${
                       axisLabelDecimalPoint
                         ? parseFloat(params?.value?.toString())?.toFixed(
                             axisLabelDecimalPoint
                           )
                         : !customizeYaxiswithStorage
                         ? params?.value
                         : ""
                     }${series?.unit || ""}
                      ${
                        series?.count && series?.count[params?.dataIndex]
                          ? `(${series?.count[params?.dataIndex]})`
                          : ""
                      } 
                      ${customizeYaxiswithStorage && getBytesCon}
                      </div>
                    </div>
                    </div>`;
        },
      };
    }

    if (series?.percentCount) {
      getChartOptions.tooltip = {
        ...defaultOptions.tooltip,
        trigger: isPieChart ? {} : "axis",
        formatter: function (params) {
          let divs = "";
          params?.forEach((item) => {
            divs += `
                      <div
                        class="flex justify-between items-center whitespace-nowrap"
                        style="margin: 10px 0 0; line-height: 1"
                      >
                        <div class="pr-4">${item?.marker}
                        <span class="opacity-75">${
                          item?.seriesName
                        }</span></div>
                        <div class="font-semibold">
                          ${item?.value}%
                          (${
                            series?.percentCount[item?.dataIndex][
                              item?.componentIndex
                            ]
                          })
                        </div>
                      </div>`;
          });
          return `<div
                    class="bg-[var(--g-panel-bg-main)] rounded flex flex-col text-sm chartTooltip whitespace-nowrap decoration-[var(--g-text-color)]"
                    style="
                      margin: -11px;
                      padding: 10px;
                      border: 0.5px solid var(--g-panel-heading-border) !important;
                    ">
                    <div
                        class="font-normal text-sm opacity-75"
                        style="line-height: 1"
                      >
                        ${params?.[0]?.axisValue}
                      </div>
                    ${divs}
                  </div>
                  `;
        },
      };
    }

    getChartOptions.legend = {
      ...defaultOptions.legend,
      show: isPieChart ? false : true,
    };
    let getSeries = { ...getChartOptions, series: chartData };
    getSeries = { ...getSeries, color: color };
    setChartOptions(getSeries);
  }, [chartType, pieIndex, series, yAxis, color, newChartType]);

  const handleNavigation = () => {
    setChartOptionPopup(false);
  };

  React.useEffect(() => {
    document.body.addEventListener("scroll", handleNavigation);
    document
      .getElementById("moduleScroll")
      ?.addEventListener("scroll", handleNavigation);

    return () => {
      document.body.removeEventListener("scroll", handleNavigation);
      document
        .getElementById("moduleScroll")
        ?.removeEventListener("scroll", handleNavigation);
    };
  }, []);

  const [dataViews, setDataViews] = React.useState({
    dataViewState: false,
    headers: [],
    dataPoints: [],
  });

  const handleDataViewTable = () => {
    setChartType("table view");
    const headersData = series?.xAxis && ["Name", ...series?.xAxis];
    const headers = headersData?.map((i) => ({ key: i, label: i }));
    let values = [];
    if (Array.isArray(series?.data)) {
      values = series?.data?.map((item) => {
        const row = {};
        headersData?.forEach((key, index) => {
          row[key] = index === 0 ? item.name : item?.value[index - 1];
        });
        return row;
      });
    }
    setDataViews({ headers: headers, dataPoints: values, dataViewState: true });
    setChartOptionPopup(false);
  };

  React.useEffect(() => {
    if (dataViews.dataViewState && series?.data) {
      handleDataViewTable();
    }
  }, [series?.data]);

  return (
    <>
      <WidgetComponent
        headerChildren={
          <React.Fragment>
            {series?.data?.length > 1 &&
              ["pie", "donut", "Line"].includes(chartType) && (
                <select
                  className="border rounded cursor-pointer px-1 global_widget"
                  style={{
                    borderColor: "var(--border-color)",
                    maxWidth: "150px",
                    minWidth: "90px",
                  }}
                  onChange={(e) => setPieIndex(e.target.value)}
                >
                  {series.data.map((label, i) => (
                    <option value={i} key={i}>
                      {label.name || "No-options"}
                    </option>
                  ))}
                </select>
              )}

            {dataoptions?.length > 0 && (
              <select
                className="border rounded cursor-pointer px-1 global_widget"
                style={{
                  borderColor: "var(--border-color)",
                  maxWidth: "150px",
                  minWidth: "90px",
                }}
                onChange={(e) => onSelectDrop(e)}
              >
                {dataoptions?.map((val) => {
                  return <option value={val}>{val}</option>;
                })}
              </select>
            )}

            {configWrap?.chart && (
              <Popup
                trigger={
                  <div className="global_togglePopup-root">
                    {" "}
                    <RiFolderChartFill size={22} />{" "}
                  </div>
                }
                position="bottom right"
                on="click"
                className={"global_togglePopup"}
                closeOnDocumentClick
                open={chartOptionPopup}
                onOpen={() => setChartOptionPopup(true)}
                onClose={() => setChartOptionPopup(false)}
              >
                <div
                  className={"global_togglePopup-body"}
                  style={{
                    cursor: "pointer",
                    maxHeight: "calc(100vh - 100px)",
                    overflowY: "auto",
                    display: "flex",
                    flexDirection: "column",
                    paddingBottom: "0.25rem",
                    paddingTop: "0.25rem",
                  }}
                >
                  {customChartTypes.map((chart, chartIndex) => {
                    let shouldrender = true;

                    if (
                      (chart === "line & bar" || chart === "stack bar") &&
                      series?.data?.length <= 1
                    ) {
                      shouldrender = false;
                    } else {
                      shouldrender = true;
                    }

                    if (shouldrender) {
                      return (
                        <div
                          className={`global_togglePopup-item chartIcon ${
                            chartType === chart ? "disableItem" : ""
                          }`}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            cursor: "pointer",
                            padding: "0.75rem 1rem",
                          }}
                          onClick={() => {
                            setChartType(chart.toLocaleLowerCase());
                            setIsChartOption(!isChartOption);
                            setChartOptionPopup(false);
                            setDataViews(false);
                          }}
                          key={chartIndex}
                        >
                          <span className="global_togglePopup-item-icon">
                            {chart === "area" && <AreaChartSvg />}
                            {chart === "line" && <LineChartSvg />}
                            {chart === "bar" && <BarChartSvg />}
                            {chart === "line & bar" && <LineBarChart />}
                            {chart === "pie" && <PieChartSvg />}
                            {chart === "donut" && <DoughNutChartSvg />}
                            {chart === "horizontal" && <HorizontalChartSvg />}
                            {chart === "stack bar" && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                                focusable="false"
                                width="1em"
                                height="1em"
                                preserveAspectRatio="xMidYMid meet"
                                viewBox="0 0 32 32"
                              >
                                <path
                                  d="M28 28V6h-8v22h-4V14H8v14H4V2H2v26a2 2 0 0 0 2 2h26v-2zM22 8h4v10h-4zm-12 8h4v6h-4z"
                                  fill="currentColor"
                                />
                              </svg>
                            )}
                          </span>
                          <span
                            className={
                              "global_togglePopup-item-text capitalize"
                            }
                          >
                            {chart} Chart
                          </span>
                        </div>
                      );
                    } else return null;
                  })}
                </div>
                {/* {!newChartType && (
                  <span
                    className={`global_togglePopup-item cursor-Pointer ${
                      chartType === "table view" ? "disableItem" : ""
                    }`}
                    onClick={() => handleDataViewTable()}
                  >
                   <PiTable />
                    <span className="pl-1">Table View</span>
                  </span>
                )} */}
              </Popup>
            )}
          </React.Fragment>
        }
        isChart
        {...props}
      >
        {(isFullScreen) => (
          <div
            className="flex flex-col flex-1 w-full py-4 items-center justify-start"
            data-testid={dataTestId}
          >
            {(isLoading ||
              isError ||
              !series?.xAxis ||
              series?.xAxis.length === 0) && (
              <div
                className="flex flex-col h-full w-full text-gray-500 items-center justify-center"
                style={{ height: chartMinHeight }}
              >
                {isLoading && <Loader content="loading..." className="pl-2" />}
                {isError && <p className="text-red-500">{isError}</p>}
                {!isLoading &&
                  !isError &&
                  (!series?.xAxis || series?.xAxis.length === 0) && (
                    <p>{noDataText}</p>
                  )}
              </div>
            )}

            {!isLoading &&
              !isError &&
              series?.xAxis &&
              series?.xAxis?.length !== 0 &&
              !dataViews.dataViewState && (
                <ReactEcharts
                  opts={{ renderer }}
                  option={{
                    ...chartOptions,
                    xAxis: {
                      ...chartOptions.xAxis,
                      axisLabel: {
                        ...chartOptions.xAxis.axisLabel,
                        rotate: rotateXAxisLabel,
                        minWidth: isFullScreen ? 300 : 200,
                        width: isFullScreen ? 200 : 90,
                        overflow: "truncate",
                      },
                    },
                    yAxis:
                      chartOptions?.yAxis && Array.isArray(chartOptions?.yAxis)
                        ? [
                            ...chartOptions?.yAxis.map((y) => ({
                              ...chartOptions?.yAxis,
                              axisLabel: {
                                ...chartOptions.yAxis.axisLabel,
                                rotate: rotateYAxisLabel,
                                minWidth: isFullScreen ? 500 : 400,
                                width: isFullScreen ? 500 : 150,
                                overflow: "truncate",
                              },
                              ...y,
                            })),
                          ]
                        : {
                            ...chartOptions.yAxis,
                            axisLabel: {
                              ...chartOptions.yAxis.axisLabel,
                              rotate: rotateYAxisLabel,
                              minWidth: isFullScreen ? 500 : 400,
                              width: isFullScreen ? 500 : 150,
                              overflow: "truncate",
                            },
                          },
                  }}
                  notMerge={true}
                  lazyUpdate={true}
                  onEvents={onEvents}
                  style={{
                    minHeight: chartMinHeight,
                    height: isFullScreen ? "100%" : "auto",
                  }}
                  className="w-full"
                />
              )}
            {/* {dataViews.dataViewState && !isLoading && (
              <DataView
                data={dataViews}
                isFullScreen={isFullScreen}
                tableValue={tableValue}
              />
            )} */}
          </div>
        )}
      </WidgetComponent>
    </>
  );
};

ChartWidgetComponent.propTypes = {
  title: PropTypes.string,
  renderAs: PropTypes.oneOf(["svg", "canvas"]),
  type: PropTypes.oneOf(customChartTypes),
  series: PropTypes.any.isRequired,
  rotateXAxisLabel: PropTypes.number,
  rotateYAxisLabel: PropTypes.number,
  radiusLevel: PropTypes.array,
  chartAnimation: PropTypes.bool,
  dataoptions: PropTypes.shape(),
  axisLabelDecimalPoint: PropTypes.number,
  dataTestId: PropTypes.string,
  newChartType: PropTypes.string,
};

ChartWidgetComponent.defaultProps = {
  name: "Chart Title",
  renderAs: "svg",
  color: allChartColors?.defaultChartColor,
  monoColors: allChartColors?.defaultMonoChartColor,
  type: "bar",
  data: [],
  rotateXAxisLabel: 30,
  rotateYAxisLabel: 0,
  radiusLevel: ["40%", "70%"],
  chartAnimation: true,
  dataoptions: undefined,
  axisLabelDecimalPoint: null,
  dataTestId: "",
  newChartType: "",
};
