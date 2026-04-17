import { useParams } from "react-router-dom";

function MovieDetails() {
  const { id } = useParams();

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Movie Details</h2>
      <p>Movie ID: {id}</p>
    </div>
  );
}

export default MovieDetails;