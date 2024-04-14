import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import MoviesPage from "../../pages/movies";
import MoviePage from "../../pages/movie";

import appStyles from "./app.module.css";

function App() {
  return (
    <main className={appStyles.app}>
      {/* Роуты */}
      <Routes>
        {/* Роут фильмов */}
        <Route path="/movies" element={<MoviesPage />} />
        {/* Роут фильма */}
        <Route path="/movies/:id" element={<MoviePage />} />
        <Route path="*" element={<Navigate to="/movies" replace />} />
      </Routes>
    </main>
  );
}

export default App;
