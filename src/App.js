import {
  Home,
  Public,
  Personal,
  Album,
  WeekRank,
  ZingChart,
} from "./containers/public/";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import path from "./ultis/path";
import { useEffect, useState } from "react";
import * as actions from "./store/actions";
import { useDispatch } from "react-redux";
import { apiGetChartHome } from "./apis";
function App() {
  const dispatch = useDispatch();
  const [weekChart, setWeekChart] = useState();
  useEffect(() => {
    dispatch(actions.getHome());
    const fetchChartData = async () => {
      const res = await apiGetChartHome();
      if (res.data.err === 0) setWeekChart(res.data.data.weekChart);
    };
    fetchChartData();
  }, []);

  return (
    <>
      <div className="">
        <Routes>
          <Route path={path.PUBLIC} element={<Public />}>
            <Route path={path.HOME} element={<Home />} />

            <Route path={path.MY_MUSIC} element={<Personal />} />
            <Route path={path.ALBUM__TITLE__PID} element={<Album />} />
            <Route path={path.PLAYLIST__TITLE__PID} element={<Album />} />
            <Route
              path={path.WEEKRANK__TITLE__PID}
              element={
                <WeekRank weekChart={weekChart && Object.values(weekChart)} />
              }
            />
            <Route path={path.ZING_CHART} element={<ZingChart />} />

            <Route path={path.STAR} element={<Home />} />
          </Route>
        </Routes>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
