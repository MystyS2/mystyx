import "./App.css";
import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";
import HomePage from "./pages/HomePage/HomePage";
import MoviePage from "./pages/Movies/MoviePage";
import DetailPage from "./pages/Detail/DetailPage";
import NotFoundPage from "./NotFoundPage/NotFoundPage";

// 홈페이지                    /
// 영화 리스트 페이지(검색가능) /movies
// 영화 디테일 페이지          /movies/:id
function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="movies" index element={<MoviePage />} />
        <Route path="detail/:type/:id" element={<DetailPage />} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
