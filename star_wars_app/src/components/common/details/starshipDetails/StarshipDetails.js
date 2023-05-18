import style from "./StarshipDetails.module.css";
import axiosHelper from "../../helper/axiosHelper";
import { useEffect } from "react";
import axios from "axios";
import { loaderChangeAction } from "../../../../store/reducer/LoaderReducer";
import { useDispatch, useSelector } from "react-redux";
import { movieAction } from "../../../../store/reducer/MovieReducer";

function StarshipDetails(props) {
  const dispatch = useDispatch();
  const { starshipsData } = props;
  const starShipsData = useSelector((state) => state.movieReducer.extraData);
  const sideBarStatus = useSelector(
    (state) => state.movieReducer.sideBarStatus
  );
  useEffect(() => {
    (async () => {
      dispatch(loaderChangeAction.loaderCountIncrease());
      try {
        const res = await Promise.all(
          starShipsData.map(async (starship) => {
            const pilotsData = await Promise.all(
              starship.pilots.map((api) => axios.get(api))
            );
            const pilotNames = pilotsData.map((pilot) => pilot.data.name);
            return {
              ...starship,
              pilots: pilotNames,
            };
          })
        );
        dispatch(movieAction.charactersDataChange(res));
        dispatch(loaderChangeAction.loaderCountDecrease());
      } catch (err) {
        dispatch(loaderChangeAction.loaderCountDecrease());
      }
    })();
  }, [sideBarStatus]);

  return (
    <div className={style.charactersContainer}>
      <div>
        <div>Model-</div>
        <span>{starshipsData.model}</span>
      </div>
      <div>
        <div>Passengers-</div>
        <span>{starshipsData.passengers}</span>
      </div>
      <div>
        <div>Cargo Capacity-</div>
        <span>{starshipsData.cargo_capacity}</span>
      </div>
      <div>
        <div>Hyperdrive Rating-</div>
        <span>{starshipsData.hyperdrive_rating}</span>
      </div>
      <div>
        <div>Length-</div>
        <span>{starshipsData.length}</span>
      </div>
      <div>
        <div>Cost-</div>
        <span>{starshipsData.cost_in_credits}</span>
      </div>
      <div>
        <div>Pilots-</div>
        {starshipsData?.pilots && starshipsData?.pilots.length > 0 ? (
          starshipsData.pilots.map((item, index) => {
            return <span key={index}>{item}</span>;
          })
        ) : (
          <span>Not Mentioned</span>
        )}
      </div>
    </div>
  );
}

export default StarshipDetails;
