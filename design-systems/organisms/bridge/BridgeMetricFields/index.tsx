function BridgeMetricFields({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col justify-between mb-3">
      <div className=" text-gray-500 font-medium text-[18px]">{label}</div>
      <div className="font-medium text-[20px] text-black dark:text-white">
        {value}
      </div>
    </div>
  );
}

export default BridgeMetricFields;
