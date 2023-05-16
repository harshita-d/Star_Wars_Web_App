import axiosHelper from "../helper/axiosHelper";
import { urlConfig } from "../../../config/URLConfig";
import { movieAction } from "../../../store/reducer/MovieReducer";

export const MovieDataAPI = async (props) => {
  try {
    const response = await axiosHelper.get(
      `/${urlConfig.films}/${props.state.id}`
    );
    props.dispatch(movieAction.movieData(response.data));
  } catch (err) {
    console.log("MovieDataAPI Error", err);
  }
};
