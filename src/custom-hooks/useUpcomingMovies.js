import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUpcomingMovies } from "../utils/moviesSlice";
import {UPCOMING_MOVIES_URL,options} from "../utils/constant";

const useUpcomingMovies = () => {
    const dispatch = useDispatch()
    const fetchUpcomingMovies = async () => {
      const data = await fetch(UPCOMING_MOVIES_URL, options);
      const json = await data.json();
      dispatch(addUpcomingMovies(json.results))
    };
  
    useEffect(() => {
      fetchUpcomingMovies();
    }, []);
}

export default useUpcomingMovies