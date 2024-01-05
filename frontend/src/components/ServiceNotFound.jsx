import React from "react";
import styled from "styled-components";

const ServiceNotFound = () => {
  return (
    <NotFound className="no-result">
      <img src="/images/no-listings.png" alt="No result"></img>
      <p>Nous n’avons pas pu trouver les services que vous recherchez.</p>
    </NotFound>
  );
};

//**** styled componnents ****
const NotFound = styled.div`
  position: absolute;
  left: 50%;
  top: 40px;
  transform: translateX(-50%);
  text-align: center;
  img {
    display: inline;
    width: 100px;
  }
  p {
    width: fit-content;
    color: rgba(255, 0, 0, 0.8);
  }
`;

export default ServiceNotFound;
