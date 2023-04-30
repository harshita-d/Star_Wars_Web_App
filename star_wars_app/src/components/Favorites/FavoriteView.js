import { useEffect, useState } from "react";
import styles from "./FavoriteView.module.css";
import { useSelector, useDispatch } from "react-redux";
import { fireStore } from "../common/auth/AuthConfig";
import { favAction } from "../../store/reducer/FavoriteReducer";
import epOne from "../../assets/ep1.jpg";
import epTwo from "../../assets/ep2.jpg";
import epThree from "../../assets/ep3.jpg";
import epFour from "../../assets/ep4.jpeg";
import epFive from "../../assets/ep5.jpg";
import epSix from "../../assets/ep6.jpg";
import deleteIcon from "../../assets/delete.png";
import { loaderChangeAction } from "../../store/reducer/LoaderReducer";

function FavoriteView() {
  const userData = useSelector((state) => state.authReducer.authData);
  const favData = useSelector((state) => state.favoriteReducer?.favorites);
  const dispatch = useDispatch();

  useEffect(() => {
    async function getData() {
      dispatch(loaderChangeAction.loaderCountIncrease());
      const docRef = fireStore.collection("users").doc(userData?.uid);
      const favoritesCollectionRef = docRef.collection("favorites");
      const querySnapshot = await favoritesCollectionRef.get();
      const favoritesList = [];
      querySnapshot.forEach((doc, i) => {
        const favorite = doc.data();
        favorite.id = doc.id;
        favoritesList.push(favorite);
      });
      dispatch(loaderChangeAction.loaderCountDecrease());
      dispatch(favAction.favoritesData(favoritesList));
      console.log("favoritesList", favoritesList);
    }
    getData();
  }, [userData]);

  const images = [
    { id: 1, imageName: epOne },
    { id: 2, imageName: epTwo },
    { id: 3, imageName: epThree },
    { id: 4, imageName: epFour },
    { id: 5, imageName: epFive },
    { id: 6, imageName: epSix },
  ];

  const handleDeleteFav = async (docId) => {
    try {
      const docRef = fireStore
        .collection("users")
        .doc(userData?.uid)
        .collection("favorites")
        .doc(docId);

      await docRef.delete();
      const arrayData = favData.filter((item) => item.id !== docId);
      console.log("arrayData", arrayData);
      dispatch(favAction.favoritesData(arrayData));
      console.log("deleted");
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <div className={styles.FavBody}>
      <span>Favorites</span>
      <div className={styles.FavcardList}>
        {favData &&
          favData.map((item, index) => {
            const imgVal = images.find(
              (img) => img.id === item.epId
            )?.imageName;

            return (
              <div key={index}>
                <img src={`${imgVal}`} alt="images" />
                <div>
                  <span>{item.itemName}</span>
                  <span>{item.movieName}</span>
                  <span>{item.type}</span>
                  <span onClick={() => handleDeleteFav(item.id)}>
                    Delete
                    <img src={deleteIcon} alt="del" />
                  </span>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default FavoriteView;
