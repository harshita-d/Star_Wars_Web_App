import React from "react";
import { useSelector } from "react-redux";
import style from "./CharacterDetails.module.css";
import favoriteIcon from "../../../../assets/FavOutlineIcon.png";

function CharacterDetails(props) {
  const { charactersData } = props;
  console.log("charactersData", charactersData);

  return (
    <div className={style.charactersContainer}>
      <div>
        <div>Year of Birth-</div>
        <span>{charactersData.birth_year}</span>
      </div>
      <div>
        <div>Gender-</div>
        <span>{charactersData.gender}</span>
      </div>
      <div>
        <div>Height-</div>
        <span>{charactersData.height}</span>
      </div>
      <div>
        <div>Mass-</div>
        <span>{charactersData.mass}</span>
      </div>
      <div>
        <div>Hair Color-</div>
        <span>{charactersData.hair_color}</span>
      </div>
      <div>
        <div>Skin Color-</div>
        <span>{charactersData.skin_color}</span>
      </div>
      <div>
        <div>Eye Color-</div>
        <span>{charactersData.eye_color}</span>
      </div>
    </div>
  );
}

export default CharacterDetails;
