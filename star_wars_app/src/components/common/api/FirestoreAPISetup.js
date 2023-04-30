import { fireStore } from "../auth/AuthConfig";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const FirestoreAPISetup = (props) => {
  const { name, type } = props;
  const userData = useSelector((state) => state.authReducer.authData);
  const movieData = useSelector((state) => state.movieReducer?.movie);

  useEffect(() => {
    async function getData() {
      const docRef = fireStore.collection("users").doc(userData.uid);
      const favoritesCollectionRef = docRef.collection("favorites");

      const favoriteMovie = {
        email: userData.email,
        date: new Date(),
        itemName: name,
        type: type,
        movieName: movieData.title,
        epId: movieData.episode_id,
      };

      favoritesCollectionRef
        .add(favoriteMovie)
        .then((docRef) => {
          console.log("Document saved!");
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
    getData();
  }, [name, type]);
  return <></>;
};
