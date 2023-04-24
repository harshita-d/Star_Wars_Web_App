import axiosHelper from "../helper/axiosHelper";
import { urlConfig } from "../../../config/URLConfig";
import { movieAction } from "../../../store/reducer/MovieReducer";
import { useDispatch } from "react-redux";

export const MovieDataAPI = async (props) => {
  //const dispatch = useDispatch();
  console.log("======*****");
  try {
    const response = await axiosHelper.get(
      `/${urlConfig.films}/${props.state.id}`
    );
    props.dispatch(movieAction.movieData(response.data));
  } catch (err) {
    console.log("MovieDataAPI", err);
  }
};
