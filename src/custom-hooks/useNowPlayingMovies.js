import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addNowPlayingMovies } from "../utils/moviesSlice";
import { NOW_PLAYING_MOVIES_URL,options } from "../utils/constant";

const useNowPlayingMovies = () => {
    const dispatch = useDispatch()
    const fetchNowPlayingMovies = async () => {
      const data = await fetch(NOW_PLAYING_MOVIES_URL, options);
      const json = await data.json();
      dispatch(addNowPlayingMovies(json.results))
    };
  
    useEffect(() => {
      fetchNowPlayingMovies();
    }, []);
}

export default useNowPlayingMovies