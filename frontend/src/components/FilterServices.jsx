import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import store from "../redux/store";
import { data } from "../data/Data";
import axios from "axios";

const FilterServices = (props) => {
  // ****References****
  const govRef = useRef();
  const cityRef = useRef();
  const catRef = useRef();
  const optionsGRef = useRef();
  const optionsCRef = useRef();
  const optionsDRef = useRef();
  const selectGRef = useRef();
  const selectCRef = useRef();
  const selectDRef = useRef();

  // ****States****
  const intialFilterState = {
    gov: "Toute la Tunisie",
    city: "Sélectionner tout",
    cat: "Toute les catégories",
    searchFilter: "",
  };
  const [filter, setFilter] = useState(intialFilterState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8090/categories");
        setCategories(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const searchFilterClick = (e) => {
    e.preventDefault();
    store.dispatch({
      type: "FILTER_SERVICES",
      payload: {
        id: props.id,
        filterValues: filter,
      },
    });
    setFilter((prev) => {
      return { ...prev, searchFilter: "" };
    });
    props.setServicesFunction();
  };

  // drop down functions
  useEffect(() => {
    if (filter.gov === "Toute la Tunisie") {
      selectDRef.current.classList.add("ico");
      optionsDRef.current.classList.remove("active");
    } else {
      selectDRef.current.classList.remove("ico");
    }
  }, [filter.gov]);

  function clickGDropDown() {
    optionsGRef.current.classList.toggle("active");
  }

  function clickCDropDown() {
    optionsCRef.current.classList.toggle("active");
  }

  function clickDDropDown() {
    if (filter.gov !== "Toute la Tunisie") {
      optionsDRef.current.classList.toggle("active");
    }
  }

  function clickGOption(e) {
    optionsGRef.current.classList.toggle("active");
    selectGRef.current.innerHTML = e.target.innerHTML;
    selectGRef.current.style.color = "#000";
    setFilter((prev) => {
      return { ...prev, gov: selectGRef.current.innerHTML };
    });
    selectDRef.current.innerHTML = "Délégation";
    selectDRef.current.style.color = "#999";
    setFilter((prev) => {
      return { ...prev, city: "Sélectionner tout" };
    });
  }

  function clickDOption(e) {
    optionsDRef.current.classList.toggle("active");
    selectDRef.current.innerHTML = e.target.innerHTML;
    selectDRef.current.style.color = "#000";
    setFilter((prev) => {
      return { ...prev, city: selectDRef.current.innerHTML };
    });
  }

  function clickCOption(e) {
    optionsCRef.current.classList.toggle("active");
    selectCRef.current.innerHTML = e.target.innerHTML;
    selectCRef.current.style.color = "#000";
    setFilter((prev) => {
      return { ...prev, cat: selectCRef.current.innerHTML };
    });
  }

  return (
    <>
      <Title>Que cherchez vous aujourd'hui ?</Title>

      <Filter className="container">
        <DropDown ref={govRef}>
          <div className="select-box">
            <div ref={optionsGRef} className="options-container">
              <div
                key={"Toute la Tunisie"}
                className="option"
                onClick={clickGOption}
              >
                Toute la Tunisie
              </div>
              {data.governorate.sort().map((e) => (
                <div key={e} className="option" onClick={clickGOption}>
                  {e}
                </div>
              ))}
            </div>
            <div className="selected" ref={selectGRef} onClick={clickGDropDown}>
              Gouvernorat
            </div>
          </div>
        </DropDown>

        <DropDown ref={cityRef}>
          <div className="select-box">
            <div ref={optionsDRef} className="options-container">
              <div
                key={"Sélectionner tout"}
                className="option"
                onClick={clickDOption}
              >
                Sélectionner tout
              </div>
              {data.city[filter.gov].sort().map((e) => (
                <div key={e} className="option" onClick={clickDOption}>
                  {e}
                </div>
              ))}
            </div>
            <div className="selected" ref={selectDRef} onClick={clickDDropDown}>
              Délégation
            </div>
          </div>
        </DropDown>

        <DropDown ref={catRef}>
          <div className="select-box">
            <div ref={optionsCRef} className="options-container">
              <div
                key={"Toute les catégories"}
                className="option"
                onClick={clickCOption}
              >
                Toute les catégories
              </div>
              {categories.map((e) => (
                <div key={e.id} className="option" onClick={clickCOption}>
                  {e.name}
                </div>
              ))}
            </div>
            <div className="selected" ref={selectCRef} onClick={clickCDropDown}>
              Categorie
            </div>
          </div>
        </DropDown>
        <div className="filterSearch">
          <input
            placeholder="Que recherchez-vous ?"
            type="text"
            value={filter.searchFilter}
            onChange={(e) =>
              setFilter((prev) => {
                return { ...prev, searchFilter: e.target.value };
              })
            }
          />
          <i className="uil uil-search" />
        </div>
        <button onClick={searchFilterClick}>
          <i className="uil uil-search"></i>
        </button>
      </Filter>
    </>
  );
};

export const Title = styled.div`
  user-select: none;
  font-weight: 400;
  text-align: center;
  margin: 100px 0 30px;
  font-size: 25px;
  @media (max-width: 992px) {
    font-size: 20px;
  }
`;

export const Filter = styled.form`
  user-select: none;
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 50px;
  button {
    height: 47px;
    width: 60px;
    border-radius: 8px;
    outline: none;
    border: none;
    background-color: #0076ff;
    color: #fff;
    font-size: 17px;
    cursor: pointer;
  }
  .filterSearch {
    position: relative;
    width: 250px;
    input {
      height: 47px;
      width: 100%;
      border-radius: 8px;
      border: 1px solid #ccc;
      outline: none;
      padding-left: 35px;
      font-size: 15px;
    }

    input::placeholder {
      color: #999;
    }

    i {
      position: absolute;
      left: 10px;
      top: 10px;
      font-size: 18px;
    }
  }

  @media (max-width: 1200px) {
    .filterSearch {
      order: 2;
      width: 400px;
    }
  }
  @media (max-width: 992px) {
    .filterSearch {
      order: 0;
      width: 100%;
    }
    button {
      width: 100%;
      height: 35px;
    }
  }
`;

export const DropDown = styled.div`
  width: 250px;
  @media (max-width: 992px) {
    width: 100%;
  }
  .select-box {
    display: flex;
    width: 100%;
    flex-direction: column-reverse;
    font-size: 14px;
  }

  .select-box .options-container {
    background: #fff;
    color: #555;
    max-height: 0px;
    opacity: 0;
    transition: all 0.4s;

    overflow: hidden;
    overflow-y: scroll;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  .selected {
    background: #fff;
    color: #000;
    border-radius: 8px;
    margin-bottom: 4px;
    border: 1px solid #ccc;
    position: relative;
  }

  .selected::after {
    content: "";
    background: url("/images/arrow-down.svg");
    background-size: contain;
    background-repeat: no-repeat;
    position: absolute;
    height: 10px;
    width: 10px;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.4s;
  }

  .selected.ico::after {
    display: none;
  }

  .select-box .options-container.active {
    max-height: 185px;
    opacity: 1;
    overflow-y: scroll;
  }

  .select-box .options-container.active + .selected::after {
    transform: rotateX(180deg) translateY(5px);
  }

  .select-box .options-container::-webkit-scrollbar {
    width: 2px;
    background: #fff;
    border-radius: 0 8px 8px 0;
  }

  .select-box .options-container::-webkit-scrollbar-thumb {
    background: #0076ff;
    border-radius: 0 8px 8px 0;
  }

  .select-box .option,
  .selected {
    padding: 12px 24px;
    cursor: pointer;
  }

  .selected {
    color: #999;
  }

  .select-box .option {
    border-bottom: 1px solid #ddd;
  }

  .select-box .option:hover {
    background: #eee;
    color: #0076ff;
  }
`;

export default FilterServices;
