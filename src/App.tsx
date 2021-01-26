import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Header from "./components/Header";
import Notification from "./components/Notification";
import SearchArea from "./components/SearchArea";
import CardArea from "./components/CardArea";
import { fetchCountries } from "./slices/countriesSlice";
import { fetchPlaces } from "./slices/placesSlice";
import { notify } from "./slices/notificationSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((data) => {
        dispatch(
          fetchCountries(
            data.map((c: any) => ({
              id: c.alpha3Code,
              name: c.translations.pt,
              flag: c.flag,
            }))
          )
        );
        return fetch("http://localhost:5000/places");
      })
      .then((res) => res.json())
      .then((data) => {
        dispatch(fetchPlaces(data));
      })
      .catch((err) => {
        console.error(err);
        dispatch(
          notify({ type: "error", message: "Erro interno no servidor =(" })
        );
      });
  }, [dispatch]);

  return (
    <div>
      <Header />

      <SearchArea />
      <CardArea />

      <Notification />
    </div>
  );
}

export default App;
