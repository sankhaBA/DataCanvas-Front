import PublicNavbar from "../components/layouts/PublicNavbar";
import { Doughnut } from "react-chartjs-2";
import {
  FaBars,
  FaWindowClose,
  FaBuilding,
  FaHospital,
  FaHospitalAlt,
} from "react-icons/fa";
import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { Bar } from "react-chartjs-2";

function PublicPortal() {
  const getBorderClass = (property) => {
    switch (property.toLowerCase()) {
      case "cool":
        return "border-blue";
      case "ideal":
        return "border-green";
      case "high":
        return "border-orange";
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
        data: [12, 19, 3, 5, 2, 3, 7, 8, 9, 10], // Replace with your actual data
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <PublicNavbar />

      <div
        className="relative h-[400px] isolate overflow-hidden bg-cover bg-fixed bg-center flex justify-center items-center pt-28"
        style={{
          backgroundImage: `url('/img/hospital.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="relative flex justify-center items-center mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          {/* Content section */}
          <div className="text-center flex flex-col items-center space-y-3 md:flex-row md:space-y-0 md:justify-between w-full md:w-screen">
            <div className="flex flex-col items-center ">
              <HiMiniBuildingOffice2 className="text-green text-8xl " />
              <h1 className="text-white text-2xl font-bold">
                Durdans Hospitals
              </h1>
              <p className="text-gray-300">Colombo, Sri Lanka</p>
              <div className="mt-2 px-4 py-1 bg-green text-white rounded-full text-sm">
                &#x2713; Clean Air Assured
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div style={{ width: "100px", height: "100px" }}>
                <Doughnut
                  data={{
                    datasets: [
                      {
                        data: [85, 15],
                        backgroundColor: ["yellow", "#ddd"],
                        hoverBackgroundColor: ["yellow", "#ddd"],
                        borderWidth: 0,
                      },
                    ],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        enabled: false,
                      },
                    },
                    elements: {
                      arc: {
                        // Adjust these values to make the doughnut thinner
                        borderWidth: 10,
                        circumference: Math.PI,
                        radius: "50%",
                      },
                    },
                  }}
                />
              </div>
              <p className="text-white">Air Quality Index</p>
              <p className="text-green text-xl font-bold">8.5/10</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-black items-center space-y-4  px-4 md:px-0  md:flex-row md:justify-center md:space-x-4 md:space-y-0">
        {/* Cards section */}
        <div className="bg-black py-10">
          <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cardData.map((card, index) => (
              <div
                key={index}
                className={`relative bg-black p-4 rounded-lg border ${getBorderClass(
                  card.property
                )}`}
                style={{
                  borderLeftWidth: "4px",
                  borderLeftColor: getBorderClass(card.property),
                }}
              >
                <div
                  className={`absolute top-0 left-0 h-full w-1.5 ${getBorderClass(
                    card.property
                  )}`}
                  style={{ backgroundColor: getBorderClass(card.property) }}
                ></div>
                <p className="text-gray-400">{card.title}</p>

                <div className="flex justify-between items-center">
                  <p className="text-white text-lg">{card.value}</p>
                  {card.detail && (
                    <p className="text-gray-400">{card.detail}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Graph section */}
        <div className="pt-10">
        <div style={{ width: '600px', height: '400px' }}>
          <h2 className="text-white text-center">Air Quality Index for the last 10 days</h2>
          <Bar
            data={airQualityData}
            options={{
              responsive: true,
              scales: {
                x: {
                  display: false, // Hide x-axis labels
                },
                y: {
                  display: false, // Hide y-axis labels
                },
              },
            }}
          />
        </div>
        </div>
      </div>
    </div>
  );
}

export default PublicPortal;
