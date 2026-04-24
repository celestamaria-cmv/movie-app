import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";

// 🔥 Lazy load pages
const Home = lazy(() => import("./pages/Home"));
const MovieDetails = lazy(() => import("./pages/MovieDetails"));

function App() {
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Suspense>
  );
}

export default App;