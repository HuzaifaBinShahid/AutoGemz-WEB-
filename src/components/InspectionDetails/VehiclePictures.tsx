interface VehiclePicture {
  image: string;
  label: string;
}

interface VehiclePicturesProps {
  pictures: VehiclePicture[];
}

const VehiclePictures = ({ pictures }: VehiclePicturesProps) => {
  return (
    <div
      className="bg-white p-6"
      style={{
        boxShadow: "0px 8px 10px -6px #0000001A, 0px 20px 25px -5px #0000001A",
        borderRadius: "0",
      }}
    >
      <h3
        className="uppercase font-medium text-black mb-6"
        style={{
          fontFamily: "'Chakra Petch', sans-serif",
          fontWeight: 600,
          fontSize: "24px",
          lineHeight: "32px",
          letterSpacing: "0.14em",
          verticalAlign: "middle",
        }}
      >
        MAIN - VEHICLE PICTURES
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {pictures.map((picture, index) => (
          <div key={index} className="flex flex-col">
            <img
              src={picture.image}
              alt={picture.label}
              className="w-full h-auto object-cover"
              style={{ borderRadius: "0" }}
            />
            <p className="text-lg text-black font-medium mt-2 border-l-4 border-autogemz-orange pl-2">{picture.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehiclePictures;
