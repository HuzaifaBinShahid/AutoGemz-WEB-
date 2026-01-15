interface StatusCardProps {
  title: string;
  value: string;
  status?: string;
}

const StatusCard = ({ title, value, status }: StatusCardProps) => {
  return (
    <div
      className="bg-white p-6"
      style={{
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 1px 2px -1px #0000001A, 0px 1px 3px 0px #0000001A",
      }}
    >
      <p className="text-[16px] mb-2" style={{ color: "#1F293799" }}>
        {title}
      </p>
      <h3 className="text-2xl font-bold mb-2 text-gray-900">{value}</h3>
      {status && (
        <span
          className="inline-block px-3 py-1 rounded text-sm text-gray-600"
          style={{ backgroundColor: "#F2F2F2" }}
        >
          {status}
        </span>
      )}
    </div>
  );
};

export default StatusCard;
