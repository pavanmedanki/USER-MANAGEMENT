import React from "react";
import PropTypes from "prop-types";
import Popup from "reactjs-popup";
import { ToastContainer } from "react-toastify";
import { useScreenshot, createFileName } from "use-react-screenshot";
import { toPng } from "html-to-image";
// import { Loader, EmailComponent, html2Canvas } from "../../components";
import {
  HiOutlineDotsVertical,
  FiDownload,
  FiMail,
  FiRefreshCcw,
  FiFilter,
  InfoIcon,
  // AnalysisIcon,
} from "../Assets/icons";

export const WidgetHeaderComponent = (props) => {
  const {
    title,
    titleStr = "",
    handleRefresh,
    handleWidgetDownload,
    // userEditAccess,
    config,
    headerChildren,
    getIsFullScreen,
    isBurgerMenu = true,
    referingMain,
    handleEdit,
    handleRemove,
    headerIcon = undefined,
    filterValues,
    widgetFilter,
    widgetFilterLength,
    isChartOption = true,
    widgetHeaderClass,
    moduleUrl,
    ToolTipText,
    refreshIcon,
    series,
    WidgetInfoIcon,
    infoContent,
    IsIcon,
    infoIcon = false,
    infoIconText,
    analysisPage,
    setViewScreen,
  } = props;
  let configWrap = {
    refresh: true,
    chart: true,
    mail: true,
    fileDownload: true,
    screenMax: true,
    fileEdit: false,
    fileRemove: false,
    wFilter: false,
    ...config,
  };

  const edit = true;

  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [isDownloading, setIsDownloading] = React.useState(false);
  const [isExporting, setIsExporting] = React.useState(false);
  const [filterPopup, setFilterPopup] = React.useState(false);
  const [widgetFilterPopup, setWidgetFilterPopup] = React.useState(false);

  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const _handleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    getIsFullScreen(!isFullScreen);
    handleCloseFilterPopup();
  };

  const handleCloseFilterPopup = () => {
    setFilterPopup(false);
  };

  const _downloadScreenshot = async () => {
    handleCloseFilterPopup();
    setIsDownloading(true);

    toPng(referingMain.current, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });

    setIsDownloading(false);
  };

  const handleWidgetClickDownload = async () => {
    handleCloseFilterPopup();
    setIsDownloading(true);
    await handleWidgetDownload();
    setIsDownloading(false);
  };

  const _emailExport = () => {
    setIsExporting(true);
    handleCloseFilterPopup();
  };
  const download = (
    image,
    {
      name = typeof title === "string" ? title : titleStr,
      extension = "jpg",
    } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    setIsDownloading(false);
    a.click();
  };

  const handleNavigation = () => {
    setFilterPopup(false);
    setWidgetFilterPopup(false);
  };

  React.useEffect(() => {
    document.body.addEventListener("scroll", handleNavigation, {
      passive: true,
    });
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

  const handleCloseView = (value) => {
    setViewScreen(value);
    handleCloseFilterPopup();
  };

  return (
    <React.Fragment>
      <header
        className={`flex-initial flex items-center justify-between  ${widgetHeaderClass}`}
        style={{ borderColor: "var(--border-color)" }}
        title={infoContent?.short}
      >
        <div className="flex">
          {headerIcon && (
            <span className="pr-1 opacity-70"> {headerIcon} </span>
          )}
          {moduleUrl ? (
            <a href={moduleUrl}>
              {ToolTipText ? (
                <Popup
                  trigger={() => <h3 className="text-lg">{title}</h3>}
                  position="top center"
                  className="kpi-tool-tip"
                  closeOnDocumentClick
                  on="hover"
                >
                  {ToolTipText}
                </Popup>
              ) : (
                <h3 className="text-lg">{title}</h3>
              )}
            </a>
          ) : ToolTipText ? (
            <Popup
              trigger={() => <h3 className="text-lg">{title}</h3>}
              position="top center"
              className="kpi-tool-tip"
              closeOnDocumentClick
              on="hover"
            >
              {ToolTipText}
            </Popup>
          ) : (
            <div className="flex  justify-between items-center">
              <h3 className="text-lg">{title}</h3>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-3 ml-auto">
          {WidgetInfoIcon && IsIcon && (
            <>
              <Popup
                trigger={() => (
                  <span title="">
                    <InfoIcon />
                  </span>
                )}
                position={["bottom right"]}
                closeOnDocumentClick
                className="WidgetInfo-popup"
                on="hover"
              >
                <span
                  style={{ textAlign: "justify", textJustify: "inter-word" }}
                  title=""
                >
                  {!infoContent?.summary ||
                  infoContent?.summary?.length <= 0 ? (
                    <div className="flex justify-center items-center">
                      No Data
                    </div>
                  ) : (
                    infoContent.summary
                  )}
                </span>
              </Popup>
            </>
          )}

          {isFullScreen && (
            <React.Fragment>
              <span
                className="global_togglePopup-item-icon cursor-pointer"
                style={{ fontSize: "25px" }}
                title="Minimize"
                onClick={() => _handleFullScreen()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  focusable="false"
                  width="1em"
                  height="1em"
                  preserveAspectRatio="xMidYMid meet"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                  </g>
                </svg>
              </span>
            </React.Fragment>
          )}
          <div className={"global_togglePopup-body"}></div>
          {configWrap?.wFilter && (
            <Popup
              trigger={
                <div
                  className={`global_togglePopup-root ${
                    widgetFilterLength ? "filterActive" : ""
                  }`}
                >
                  <FiFilter size={20} />
                </div>
              }
              position="bottom right"
              on="click"
              className={"global_togglePopup global_togglePopup_wfilter"}
              // closeOnDocumentClick={false}
              open={widgetFilterPopup}
              onOpen={() => setWidgetFilterPopup(true)}
              onClose={() => setWidgetFilterPopup(false)}
            >
              <div className={"global_togglePopup-body"}>
                {widgetFilter?.map((wFilter) => (
                  <div
                    className={"global_togglePopup-item w-full"}
                    key={wFilter?.name}
                  >
                    <span className={"global_togglePopup-item-text w-full"}>
                      {wFilter?.value}
                    </span>
                  </div>
                ))}
              </div>
            </Popup>
          )}
          {headerChildren && isChartOption && headerChildren}
          {/* {isDownloading && <Loader className="pl-2" />} */}
          {configWrap?.refresh && refreshIcon && (
            <div
              className={"pt-1 cursor-pointer"}
              onClick={() => {
                handleRefresh();
                handleCloseFilterPopup();
              }}
            >
              <span className="global_togglePopup-item-icon">
                <FiRefreshCcw size={18} />
              </span>
            </div>
          )}
          {isBurgerMenu && !isDownloading && (
            <Popup
              trigger={
                <div
                  className={`global_togglePopup-root ${
                    isFullScreen &&
                    !configWrap?.refresh &&
                    !configWrap?.fileEdit &&
                    !configWrap?.fileRemove
                      ? "hidden"
                      : ""
                  }`}
                >
                  {" "}
                  <HiOutlineDotsVertical size={26} />{" "}
                </div>
              }
              position="bottom right"
              on="click"
              className={"global_togglePopup"}
              closeOnDocumentClick
              open={filterPopup}
              onOpen={() => setFilterPopup(true)}
              onClose={() => setFilterPopup(false)}
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
                {configWrap?.refresh && !refreshIcon && (
                  <div
                    className={"global_togglePopup-item"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "0.75rem 1rem",
                    }}
                    onClick={() => {
                      handleRefresh();
                      handleCloseFilterPopup();
                    }}
                  >
                    <span className="global_togglePopup-item-icon">
                      <FiRefreshCcw />
                    </span>
                    <span className={"global_togglePopup-item-text"}>
                      Refresh
                    </span>
                  </div>
                )}

                {configWrap?.fileEdit && (
                  <div
                    className={"global_togglePopup-item"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "0.75rem 1rem",
                    }}
                    onClick={handleEdit}
                  >
                    <span className="global_togglePopup-item-icon">
                      <svg
                        className="icon"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        focusable="false"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <g fill="none">
                          <path
                            d="M16.474 5.408l2.118 2.117m-.756-3.982L12.109 9.27a2.118 2.118 0 0 0-.58 1.082L11 13l2.648-.53c.41-.082.786-.283 1.082-.579l5.727-5.727a1.853 1.853 0 1 0-2.621-2.621z"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M19 15v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </g>
                      </svg>
                    </span>
                    <span className={"global_togglePopup-item-text"}>Edit</span>
                  </div>
                )}

                {!isFullScreen && configWrap?.screenMax && (
                  <div
                    className={"global_togglePopup-item"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "0.75rem 1rem",
                    }}
                    onClick={() => _handleFullScreen()}
                  >
                    <React.Fragment>
                      <span className="global_togglePopup-item-icon">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          aria-hidden="true"
                          focusable="false"
                          width="1em"
                          height="1em"
                          preserveAspectRatio="xMidYMid meet"
                          viewBox="0 0 24 24"
                        >
                          <g
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
                          </g>
                        </svg>
                      </span>
                      <span className={"global_togglePopup-item-text"}>
                        Maximize
                      </span>
                    </React.Fragment>
                    {isFullScreen && (
                      <React.Fragment>
                        <span className="global_togglePopup-item-icon">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            aria-hidden="true"
                            focusable="false"
                            width="1em"
                            height="1em"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <g
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
                            </g>
                          </svg>
                        </span>
                        <span className={"global_togglePopup-item-text"}>
                          Minimize
                        </span>
                      </React.Fragment>
                    )}
                  </div>
                )}

                {configWrap?.fileRemove && (
                  <div
                    className={"global_togglePopup-item"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "0.75rem 1rem",
                    }}
                    onClick={handleRemove}
                  >
                    <span className="global_togglePopup-item-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        role="img"
                        width="1em"
                        height="1em"
                        preserveAspectRatio="xMidYMid meet"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M6 7H5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7H6zm10.618-3L15 2H9L7.382 4H3v2h18V4z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <span className={"global_togglePopup-item-text"}>
                      Remove
                    </span>
                  </div>
                )}

                {edit && configWrap?.fileDownload && (
                  <>
                    <div
                      className={"global_togglePopup-item"}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        padding: "0.75rem 1rem",
                      }}
                      onClick={() => _downloadScreenshot()}
                    >
                      <span className="global_togglePopup-item-icon">
                        <FiDownload />
                      </span>
                      <span className={"global_togglePopup-item-text"}>
                        Download
                      </span>
                    </div>
                    {/* {analysisPage && (
                      <div
                        className={"global_togglePopup-item"}
                        onClick={() => handleCloseView(true)}
                      >
                        <span className="global_togglePopup-item-icon">
                          <AnalysisIcon />
                        </span>
                        <span className={"global_togglePopup-item-text"}>
                          Analytics Widget
                        </span>
                      </div>
                    )} */}
                  </>
                )}

                {edit && handleWidgetDownload && (
                  <div
                    className={"global_togglePopup-item"}
                    onClick={() => {
                      handleWidgetClickDownload();
                    }}
                  >
                    <span className="global_togglePopup-item-icon">
                      <FiDownload />
                    </span>
                    <span className={"global_togglePopup-item-text"}>
                      Widget Data
                    </span>
                  </div>
                )}

                {edit && configWrap?.mail && (
                  <div
                    className={"global_togglePopup-item"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      cursor: "pointer",
                      padding: "0.75rem 1rem",
                    }}
                    onClick={() => _emailExport()}
                  >
                    <span className="global_togglePopup-item-icon">
                      <FiMail />
                    </span>
                    <span className={"global_togglePopup-item-text"}>
                      Email
                    </span>
                  </div>
                )}
              </div>
            </Popup>
          )}
        </div>
      </header>
      {/* {isExporting && (
        <EmailComponent
          exportref={referingMain}
          filterValues={filterValues}
          close={() => setIsExporting(false)}
          name={titleStr || title}
        />
      )} */}
      <span className="absolute">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover
          className="Hometoaster"
        />
      </span>
    </React.Fragment>
  );
};

WidgetHeaderComponent.propTypes = {
  title: PropTypes.string,
  isBurgerMenu: PropTypes.bool,
  widgetHeaderClass: PropTypes.string,
  moduleUrl: PropTypes.string,
  ToolTipText: PropTypes.string,
  WidgetInfoIcon: PropTypes.bool,
  infoContent: PropTypes.object,
  infoIcon: PropTypes.bool,
  infoIconText: PropTypes.string,
};

WidgetHeaderComponent.defaultProps = {
  title: "Chart Title",
  isBurgerMenu: true,
  widgetHeaderClass: "p-4",
  moduleUrl: undefined,
  ToolTipText: undefined,
  WidgetInfoIcon: false,
  infoContent: {},
  infoIcon: false,
  infoIconText: "",
};
