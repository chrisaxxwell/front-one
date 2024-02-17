import axios from "axios";
import React, { useEffect, useState } from "react";

var Api = axios.create({
  baseURL: "http://localhost:8080",
});

function App() {
  var [data, setData] = useState({
    categories: [],
  });

  var [movies, setMovies] = useState([]);
  var used = false;

  async function add(e) {
    e.preventDefault();
    await Api.post("/admin/movies/add", data);
    data = {};
    setData({});
  }

  useEffect(() => {
    if (used) return;
    used = true;
    get_();
  }, []);

  async function get_() {
    var get = await Api.get("/movies");
    console.log(get.data);
    setMovies(get.data);
  }

  return (
    <div>
      <h1>Add Movies</h1>
      <form onSubmit={add}>
        <input
          type="text"
          maxLength="30"
          value={data.title || ""}
          onChange={(e) => setData({ ...data, title: e.target.value })}
          placeholder="Movie Title"
        />
        <br />
        <input
          type="number"
          maxLength="30"
          value={data.duration || ""}
          onChange={(e) => setData({ ...data, duration: e.target.value })}
          placeholder="Movie Duration"
        />
        <div style={{ display: "flex" }}>
          <p
            onClick={(e) =>
              setData({
                ...data,
                categories: [
                  ...data.categories,
                  e.target.getAttribute("category"),
                ],
              })
            }
            category="horror"
          >
            Horror
          </p>
          <p
            onClick={(e) =>
              setData({
                ...data,
                categories: [
                  ...data.categories,
                  e.target.getAttribute("category"),
                ],
              })
            }
            category="drama"
          >
            Drama
          </p>
          <p
            onClick={(e) =>
              setData({
                ...data,
                categories: [
                  ...data.categories,
                  e.target.getAttribute("category"),
                ],
              })
            }
            category="action"
          >
            Action
          </p>
        </div>
        <br />
        <div style={{ display: "flex" }}>
          <p
            onClick={(e) =>
              setData({
                ...data,
                type: "movie",
              })
            }
          >
            Movie
          </p>
          <p
            onClick={(e) =>
              setData({
                ...data,
                type: "tv-show",
              })
            }
          >
            Tv Show
          </p>
        </div>
        <button type="submit">Adicionar filme</button>
      </form>
      <div>
        {movies.map((e) => (
          <p key={e._id}>{e.title}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
