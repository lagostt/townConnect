import React from "react";
import styled from "styled-components";

const Footer = () => {
  return (
    <FooterDiv>
      Copyrigth <i className="uil uil-copyright"></i> 2022
    </FooterDiv>
  );
};

export const FooterDiv = styled.div`
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #0077ff;
  color: #fff;
  i {
    margin: 0 5px;
  }
`;

export default Footer;
