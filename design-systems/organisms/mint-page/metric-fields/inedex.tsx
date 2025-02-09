function MetricFields({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) {
  return (
    <div className="flex justify-between mb-3">
      <div className=" text-grayLight font-medium text-lg">{label}</div>
      <div
        className="font-medium text-lg"
        style={{
          color: color,
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default MetricFields;
