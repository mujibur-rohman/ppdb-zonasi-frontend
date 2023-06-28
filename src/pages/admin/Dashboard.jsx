import ReactApexChart from "react-apexcharts";

const Dashboard = () => {
  const chartData = {
    series: [
      {
        name: "Marine Sprite",
        data: [21],
      },
      {
        name: "Striking Calf",
        data: [32],
      },
      {
        name: "Tank Picture",
        data: [20],
      },
      {
        name: "Bucket Slope",
        data: [4],
      },
      {
        name: "Reborn Kid",
        data: [10],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "100% Stacked Bar",
      },
      xaxis: {
        categories: [2008],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };
  return (
    <main>
      <p className="font-medium text-3xl mb-10">Dashboard</p>
      <div className="bg-white rounded p-5 shadow gap-10 grid grid-cols-2">
        <div>
          <p className="font-medium">Pendaftar Perjurusan</p>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
          />
        </div>
        <div>
          <p className="font-medium">Pendaftar Perjurusan</p>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
