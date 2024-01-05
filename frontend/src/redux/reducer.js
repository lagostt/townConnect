import axios from "axios";

const getServices = async (id) => {
  try {
    const responce = await axios.get("http://localhost:8090/services");
    return responce.data;
  } catch (err) {
    console.log(err);
  }
};

const searchServices = async (id, searchValue) => {
  try {
    const responce = await axios.get("http://localhost:8090/services");
    return responce.data.filter((e) =>
      e.title.toLowerCase().includes(searchValue.toLowerCase())
    );
  } catch (err) {
    console.log(err);
  }
};

const filterServices = async (id, filterValues) => {
  try {
    const responce = await axios.get("http://localhost:8090/services");
    return responce.data.filter(
      (e) =>
        (e.category === filterValues.cat ||
          filterValues.cat === "Toute les catégories") &&
        (e.delegation === filterValues.city ||
          filterValues.city === "Sélectionner tout") &&
        (e.government === filterValues.gov ||
          filterValues.gov === "Toute la Tunisie") &&
        e.title.toLowerCase().includes(filterValues.searchFilter.toLowerCase())
    );
  } catch (err) {
    console.log(err);
  }
};

function reducer(state = [], action) {
  switch (action.type) {
    case "GET_SERVICES":
      return getServices(action.payload.id);
    case "SEARCH_SERVICES":
      return searchServices(action.payload.id, action.payload.searchValue);
    case "FILTER_SERVICES":
      return filterServices(action.payload.id, action.payload.filterValues);
    case "CLEAR":
      return [];
    default:
      return state;
  }
}

export default reducer;
