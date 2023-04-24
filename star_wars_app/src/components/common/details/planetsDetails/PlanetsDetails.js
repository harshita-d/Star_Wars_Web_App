import React from "react";
import { useSelector } from "react-redux";
import style from "./Planets.module.css";
import favoriteIcon from "../../../../assets/FavOutlineIcon.png";

function PlanetsDetails(props) {
  const { planets } = props;
  console.log("planets", planets);

  return (
    <div className={style.planetsContainer}>
      <div>
        <div>Population-</div>
        <span>{planets.population}</span>
      </div>
      <div>
        <div>Terrain-</div>
        <span>{planets.terrain}</span>
      </div>
      <div>
        <div>Diameter-</div>
        <span>{planets.diameter}</span>
      </div>
      <div>
        <div>Orbital Period-</div>
        <span>{planets.orbital_period}</span>
      </div>
      <div>
        <div>Rotation Period-</div>
        <span>{planets.rotation_period}</span>
      </div>
      <div>
        <div>Surface_Water-</div>
        <span>{planets.surface_water}</span>
      </div>

      <div>
        <div>Gravity-</div>
        <span>{planets.gravity}</span>
      </div>
    </div>
  );
}

export default PlanetsDetails;
