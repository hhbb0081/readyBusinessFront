import axios from "axios";
import { useEffect, useState } from "react";

const apiRoot = process.env.REACT_APP_API_ROOT;
const apiVer = "api/v1";
const apiUrl = `${apiRoot}/${apiVer}/sale/management`;

const useFatchWeekSalesCharts = (monday) => {
  const [chartData, setChartData] = useState([]);
  const token = localStorage.getItem("accessToken");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const body = {
    monday: monday,
  };
  useEffect(() => {
    const fetchData = async () => {
      axios
        .post(`${apiUrl}`, body, config)
        .then((res) => {
          if (res.data.success) {
            setChartData(res.data.saleManagementList);
          }
        })
        .catch((err) => console.log(err));
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monday]);
  return chartData;
};

export default useFatchWeekSalesCharts;
