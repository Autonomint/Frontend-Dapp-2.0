export function TimeFrame({
  timeFrame,
  setTime,
}: {
  timeFrame?: string;
  setTime?: any;
}) {
  const timeFrames = [
    { title: "All Time", value: "allTime" },
    { title: "1Y", value: "365" },
    { title: "6M", value: "183" },
    { title: "1M", value: "30" },
    { title: "10D", value: "10" },
  ];
  return (
    <div className="border border-grayLight flex text-center w-full">
      {timeFrames?.map((item, index) => (
        <span
          onClick={() => setTime(item.value)}
          key={index}
          className={`p-2 w-full text-[16px] font-medium cursor-pointer ${
            item.value == timeFrame
              ? "bg-[#ABFFDE] border border-grayLight flex justify-center items-center dark:text-textBlack"
              : "border border-grayLight"
          }`}
        >
          {item.title}
        </span>
      ))}
    </div>
  );
}
