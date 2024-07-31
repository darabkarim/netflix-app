import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addPopularMovies } from "../utils/moviesSlice";
import { options, POPULAR_MOVIES_URL } from "../utils/constant";

const usePopularMovies = () => {
    const dispatch = useDispatch()
    const fetchNowPlayingMovies = async () => {
      const data = await fetch(POPULAR_MOVIES_URL, options);
      const json = await data.json();
      dispatch(addPopularMovies(json.results))
    };
  
    useEffect(() => {
      fetchNowPlayingMovies();
    }, []);
}

export default usePopularMovies