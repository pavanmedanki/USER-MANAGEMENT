import React from "react";
import { WidgetHeaderComponent } from "./widgetHeader";

export const WidgetComponent = (props) => {
  const {
    children,
    isHeader = true,
    chartClass,
    noPadForMain = false,
    isChart = false,
    widgetInnerScroll,
    widgetStyle,
    chartStyle,
    refreshIcon,
  } = props;
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [showIcon, setShowIcon] = React.useState(false);
  const ref = React.useRef(null);

  return (
    <React.Fragment>
      <section
        style={{
          zIndex: isFullScreen ? 99999 : "",
          marginLeft: isFullScreen ? "54px" : "",
          backgroundColor: "var(--bg-color)",
        }}
        className={`flex flex-col global_widget h-full ${
          isFullScreen ? "fixed inset-0 isFullScreen" : "rounded"
        } ${widgetStyle}`}
        onMouseEnter={() => setShowIcon(true)}
        onMouseLeave={() => setShowIcon(false)}
        title={props?.infoContent?.short || ""}
      >
        {isHeader && (
          <WidgetHeaderComponent
            {...props}
            refreshIcon={refreshIcon}
            referingMain={ref}
            getIsFullScreen={(value) => setIsFullScreen(value)}
            IsIcon={showIcon}
          />
        )}
        <main
          ref={ref}
          className={`${
            chartClass === "noFlex" ? "" : "flex-1 flex flex-col"
          } ${noPadForMain ? "" : "px-4 pb-4"} global_widget w-full
                    ${
                      widgetInnerScroll ? "overflow-y-auto" : ""
                    } ${chartStyle}`}
          style={{
            maxHeight: `${
              widgetInnerScroll
                ? isFullScreen
                  ? "calc(100vh - 60px)"
                  : "330px"
                : "auto"
            }`,
          }}
        >
          {isChart ? children(isFullScreen) : children}
        </main>
      </section>
    </React.Fragment>
  );
};

WidgetComponent.propTypes = {};

WidgetComponent.defaultProps = {};
