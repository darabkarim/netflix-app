import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { options } from "../utils/constant";
import { addTrailerVideo } from "../utils/moviesSlice";

const useTrailerVideo = (movieId) => {
    const dispatch = useDispatch()
    const fetchTrailerVideo = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/"+movieId+"/videos?language=en-US",
        options
      );
      const json = await data.json();
      const filterData = json.results?.filter(
        (video) => video.type === "Trailer"
      );
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailerVideo(trailer))
    };

    useEffect(() => {
      fetchTrailerVideo();
    }, []);
}

export default useTrailerVideo