import ReactApexChart from "react-apexcharts";
import useSWR from "swr";
import DashboardAPI, { dashboardEndPoint } from "../../api/dashboard.api";
import APIJurusan, { jurusanEndPoint } from "../../api/jurusan.api";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const Dashboard = () => {
  const { data, isLoading } = useSWR(dashboardEndPoint + "/status", (url) =>
    DashboardAPI.getStatus(url)
  );
  const { data: jurusan, isLoadingJurusan } = useSWR(jurusanEndPoint, (url) =>
    APIJurusan.getJurusan(url)
  );

  const ctx = useContext(AuthContext);

  if (isLoading || isLoadingJurusan)
    return <p className="my-5 text-center">Loading..</p>;

  const chartData = {
    series: [
      {
        name: "Kualifikasi",
        data: [data.qualify],
      },
      {
        name: "Diskualifikasi",
        data: [data.disqualify],
      },
      {
        name: "Tidak Masuk Seleksi",
        data: [data.notSelection],
      },
      {
        name: "Belum Upload Data",
        data: [data.notUpload],
      },
      {
        name: "Belum Di Verifikasi",
        data: [data.notVerification],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
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
        text: "Pendaftar Perjurusan",
      },
      xaxis: {
        categories: [2008],
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val;
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

  const chartJurusan = {
    series: [
      {
        name: "Total",
        data: jurusan?.map((jur) => ({
          x: jur?.name,
          y: jur?.pendaftarans?.length,
        })),
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 380,
      },
      xaxis: {
        type: "category",
        labels: {
          formatter: function (val) {
            return val;
          },
        },
      },
      title: {
        text: "Total Pendaftar Masing Masing Jurusan",
      },
      tooltip: {
        x: {
          formatter: function (val) {
            return val;
          },
        },
      },
    },
  };
  return (
    <main>
      <p className="font-medium text-3xl mb-10">Dashboard</p>
      <div className="bg-white rounded p-5 shadow gap-10 grid grid-cols-2">
        <div>
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="bar"
          />
        </div>
        <div>
          <ReactApexChart
            options={chartJurusan.options}
            series={chartJurusan.series}
            type="bar"
          />
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
