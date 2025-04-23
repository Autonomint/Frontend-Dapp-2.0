import MetricFields from "../metric-fields/inedex";

interface addAdditionalMeticsProps {
  deposit: string;
  optionFees: string;
  usdaBorrowed: string;
  Dp: string;
}

function InputMetics({
  deposit,
  optionFees,
  usdaBorrowed,
  Dp,
}: addAdditionalMeticsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-textBlack  font-medium text-xl dark:text-white">
        100% Synthetic LTV
      </div>
      <div className="flex flex-col mt-3">
        {[
          {
            label: "Deposit",
            value: `$${deposit}`,
            color: "#2DDA95",
            isToolTip: false,
            toolTipText: "",
          },
          {
            label: "Option Fee",
            value: `$${optionFees}`,
            color: "#FF5270",
            isToolTip: true,
            toolTipText:
              "You won’t pay anything upfront, the option fee comes out of your LTV",
          },
          {
            label: "USDA+ borrowed",
            value: `$${usdaBorrowed}`,
            color: "#627EEA",
            isToolTip: false,
            toolTipText: "",
          },
          {
            label: "Downside Protection",
            value: `$${Dp}`,
            color: "#05A552",
            isToolTip: false,
            toolTipText: "",
          },
        ].map((metric, index) => (
          <MetricFields
            key={index}
            label={metric.label}
            value={metric.value}
            color={metric.color}
            isToolTip={metric.isToolTip}
            toolTipText={metric.toolTipText}
          />
        ))}
        <div className="w-full h-[80px]">
          {Number(deposit) !== 0 &&
          Number(optionFees) !== 0 &&
          Number(usdaBorrowed) !== 0 &&
          Number(Dp) !== 0 ? (
            <div className="flex flex-col gap-1 w-full">
              <div className="flex w-full h-[60px] mb-2">
                {[
                  {
                    label: "Deposit",
                    value: Number(usdaBorrowed || 0),
                    gradient: "linear-gradient(to right, #627EEA4D,#627EEA00)",
                    gradientText: "#627EEA",
                    percentLeftPx: "8px",
                    borderLeftPx: "0px",
                  },
                  {
                    label: "Option Fee",
                    value: Number(optionFees || 0),
                    gradient: "linear-gradient(to left, #FF52704D,#FF527000)",
                    gradientText: "#FF5270",
                    percentLeftPx: "-28px",
                    borderLeftPx: "",
                    borderRightPx: "0px",
                  },

                  {
                    label: "Downside Protection",
                    value: Number(Dp || 0),
                    gradient: "linear-gradient(to right, #05A5524D, #05A55200)",
                    gradientText: "#05A552",
                    percentLeftPx: "8px",
                    borderLeftPx: "0px",
                  },
                ].map((metric, index, arr) => {
                  const total = arr.reduce((acc, item) => acc + item.value, 0);
                  const percentage = (metric.value / total) * 100 || 0;

                  return (
                    <div
                      key={index}
                      style={{
                        width: `${percentage}%`,
                      }}
                      className={` ${
                        index == 1 && "mr-1"
                      } relative h-full flex flex-col justify-end`}
                    >
                      {index == 1 && (
                        <div
                          style={{
                            height: "80%",
                            background: metric.gradient,
                          }}
                        />
                      )}
                      <div
                        className="w-full"
                        style={{
                          position: "absolute",
                          backgroundColor: "transparent",
                          color: metric.gradientText,
                          left: metric.percentLeftPx,
                        }}
                      >
                        {percentage.toFixed(2)}%
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          height: "48px",
                          width: "2px",
                          backgroundColor: metric.gradientText,
                          left: metric.borderLeftPx,
                          right: metric.borderRightPx,
                        }}
                      />

                      {index !== 1 && (
                        <div
                          style={{
                            height: "80%",
                            background: metric.gradient,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex w-full h-2 bg-gray-200 rounded-none overflow-hidden">
                {[
                  {
                    label: "Deposit",
                    value: Number(usdaBorrowed),
                    gradient: "#627EEA",
                  },
                  {
                    label: "Option Fee",
                    value: Number(optionFees),
                    gradient: "#FF5270",
                  },
                  {
                    label: "Downside Protection",
                    value: Number(Dp),
                    gradient: "#05A552",
                  },
                ].map((metric, index, arr) => {
                  const total = arr.reduce((acc, item) => acc + item.value, 0);
                  const percentage = (metric.value / total) * 100;

                  return (
                    <div
                      key={index}
                      style={{
                        width: `${percentage}%`,
                        background: metric.gradient,
                      }}
                      title={`${metric.label}: ${percentage.toFixed(2)}%`}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-1 w-full">
              <div className="flex w-full h-[60px] mb-2">
                {[
                  {
                    label: "Downside Protection",
                    value: 100,
                    gradient: "linear-gradient(to right, #05A5524D, #05A55200)",
                    gradientText: "#05A552",
                    percentLeftPx: "8px",
                    borderLeftPx: "0px",
                  },
                ].map((metric, index, arr) => {
                  const total = arr.reduce((acc, item) => acc + item.value, 0);
                  const percentage = (metric.value / total) * 100 || 0;

                  return (
                    <div
                      key={index}
                      style={{
                        width: `${percentage}%`,
                      }}
                      className={` ${
                        index == 1 && "mr-1"
                      } relative h-full flex flex-col justify-end`}
                    >
                      {index == 1 && (
                        <div
                          style={{
                            height: "80%",
                            background: metric.gradient,
                          }}
                        />
                      )}
                      <div
                        className="w-full"
                        style={{
                          position: "absolute",
                          backgroundColor: "transparent",
                          color: metric.gradientText,
                          left: metric.percentLeftPx,
                        }}
                      >
                        {0.0}%
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          height: "48px",
                          width: "2px",
                          backgroundColor: metric.gradientText,
                          left: metric.borderLeftPx,
                        }}
                      />

                      {index !== 1 && (
                        <div
                          style={{
                            height: "80%",
                            background: metric.gradient,
                          }}
                        />
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="flex w-full h-2 bg-gray-200 rounded-none overflow-hidden">
                {[
                  {
                    label: "Deposit",
                    value: Number(30),
                    gradient: "#05A552",
                  },
                  {
                    label: "Option Fee",
                    value: Number(30),
                    gradient: "#05A552",
                  },
                  {
                    label: "Downside Protection",
                    value: Number(30),
                    gradient: "#05A552",
                  },
                ].map((metric, index, arr) => {
                  const total = arr.reduce((acc, item) => acc + item.value, 0);
                  const percentage = (metric.value / total) * 100;

                  return (
                    <div
                      key={index}
                      style={{
                        width: `${percentage}%`,
                        background: metric.gradient,
                      }}
                      title={`${metric.label}: ${percentage.toFixed(2)}%`}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default InputMetics;
