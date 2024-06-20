import PublicNavbar from "../components/layouts/PublicNavbar";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { GiCheckMark } from "react-icons/gi";
import { Bar } from "react-chartjs-2";
import PillButton from "../components/input/PillButton";
import { FaChevronRight } from "react-icons/fa";

function PublicPortal() {
  const getBorderClass = (property) => {
    switch (property.toLowerCase()) {
      case "cool":
        return "border-blue-600";
      case "ideal":
        return "border-green";
      case "high":
        return "border-orange-600";
      case "extreme":
        return "border-red";
      default:
        return "border-gray";
    }
  };

  const cardData = [
    { title: "Temperature", value: "Cool", detail: "12.3°C", property: "cool" },
    { title: "Humidity", value: "Ideal", detail: "80%", property: "ideal" },
    { title: "Air Pressure", value: "Ideal", detail: "", property: "ideal" },
    { title: "Dust Particles", value: "High", detail: "", property: "high" },
    { title: "Carbon Monoxide", value: "Ideal", detail: "", property: "ideal" },
    {
      title: "Carbon Dioxide",
      value: "Extreme",
      detail: "",
      property: "extreme",
    },
  ];

  // Assuming you have air quality data for the last 10 days
  const airQualityData = {
    labels: [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
      "Day 8",
      "Day 9",
      "Day 10",
    ],
    datasets: [
      {
        label: "Air Quality",
        data: [8.5, 8.3, 8.7, 8, 8.2, 8.5, 8.6, 8.6, 8.4, 8.5], // Replace with your actual data
        backgroundColor: "#3ECF8E",
        borderColor: "#3ECF8E",
        borderWidth: 1,
      },
    ],
  };

  const Card = ({ data }) => {
    return (
      <div className={`w-full border-t border-r border-b ${getBorderClass(data.property)} border-l-8 h-20 rounded-lg flex flex-col justify-evenly items-start py-2`}>
        <div className="text-gray2 text-sm ml-4 ">{data.title}</div>
        <div className='w-full flex justify-between items-center '>
          <div className="text-white font-semibold text-2xl ml-4">{data.value}</div>
          <div className="text-gray-400 font-semibold text-2xl mr-4">{data.detail}</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
      <PublicNavbar />

      <div
        className="relative bg-cover bg-fixed bg-center bg-no-repeat mt-16"
        style={{
          backgroundImage: `url('/img/hotel.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70" />
        <div className="relative w-full grid grid-cols-1 md:grid-cols-2 py-8 px-4 sm:px-28 md:px-32 lg:px-40 xl:px-60">
          {/* Location Details */}
          <div className="flex flex-col justify-center items-center my-4 md:my-0">
            <HiMiniBuildingOffice2 className="text-green text-7xl" />
            <div className="text-white font-semibold text-2xl mt-2 text-center">
              Cinnamon Grand Hotel
            </div>
            <div className="text-gray-400 text-center">Colombo, Sri Lanka</div>
            <div className="bg-green2 rounded-full py-1 px-4 text-white flex justify-center items-center mt-2 space-x-2">
              <GiCheckMark className="text-xs" />
              <span className="text-xs">Clean Air Assured</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex justify-center items-center my-8 md:my-0">
            <div className="w-32 h-32">
              <CircularProgressbar
                value={85}
                text={`8.5`}
                styles={buildStyles({
                  textSize: '24px',
                  pathColor: `#3ECF8E`,
                  textColor: '#3ECF8E',
                  trailColor: '#d6d6d6',
                })}
              />
            </div>
            <div className="flex flex-col justify-center items-center sm:items-start ml-4">
              <div className="text-white font-semibold text-2xl mt-2 text-center">
                Air Quality Index
              </div>
              <div className="text-green text-4xl font-semibold text-center">8.5/10</div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative w-full grid grid-cols-1 md:grid-cols-2 py-8 px-4 sm:px-28 md:px-32 lg:px-40 xl:px-60">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4">
          {cardData.map((data, index) => <Card data={data} key={index} />)}
        </div>
        <div className="w-full h-80 px-2 sm:px-12 mt-6 sm:mt-0">
          <Bar
            data={airQualityData}
            options={{
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  min: 0,
                  max: 10,

                },
              },
            }}
          />
        </div>
      </div>

      <div className="relative text-gray1 text-center text-sm w-full py-8 px-4 sm:px-28 md:px-32 lg:px-40 xl:px-60">
        These insights are measured using 6 AirSense Pro devices and outcomes are verified according to WHO and US EPA standards
      </div>

      <div className="relative w-full px-4 sm:px-28 md:px-32 lg:px-40 xl:px-60 flex flex-wrap justify-center items-center space-x-4 pb-12">
        <PillButton text="Advance Insights" icon={FaChevronRight} />
        <PillButton text="Assured Standards" icon={FaChevronRight} />
      </div>
    </div >
  );
}

export default PublicPortal;
