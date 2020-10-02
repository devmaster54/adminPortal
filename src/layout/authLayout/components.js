import styled from "styled-components";
import ImgLanding from "../../assets/images/landing.jpg";

export const AuthContainer = styled.div`
  background-image: url(${ImgLanding});
  width: 100%;
  height: 100vh;
  background-position-x: center;
  background-position-y: center;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

export const FormContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 6px 4px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  max-width: 500px;
  text-align: center;
  padding: 10px 90px 50px 90px;
  font-family: Roboto;
  font-style: normal;
  font-size: 14px;
  font-weight: normal;
  line-height: 16px;
  & .flex-inline-center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  & .flex-inline-center div {
    text-align: left;
    margin-left: 15px;
  }
  & p {
    margin-bottom: 0;
  }
  & p.grey-title {
    font-weight: 500;
    font-size: 21px;
    line-height: 21px;
    color: #575962;
    margin-bottom: 25px;
  }
  & p.black-title {
    font-size: 24px;
    line-height: 36px;
    font-weight: 500;
    color: #000000;
  }
  & p.description {
    letter-spacing: 0.14px;
    color: #484848;
  }
  & p.error-message {
    color: #ff0000;
  }
  & p.input-text {
    color: #767676;
    text-align: left;
  }
  & .flex-btn-div {
    display: flex;
    align-items: center;
    padding: 17px 0;
    cursor: pointer;
  }
  & .flex-btn-div div {
    text-align: left;
    margin-left: 13px;
  }
  & .grey-border {
    border-bottom: 1px solid #c6c6c6;
  }
  & p.btn-text {
    letter-spacing: 0.14px;
    color: #000000;
    font-weight: 400;
  }
  & p.btn-subtext {
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.14px;
    color: rgba(0, 0, 0, 0.5);
  }
  & a {
    letter-spacing: 0.14px;
    text-decoration-line: underline;
    display: block;
    color: #1297e0;
    cursor: pointer;
  }
  & a.login {
    text-decoration-line: none;
    display: inline;
  }
  & input[type="text"] {
    border: none;
    border-bottom: 1px solid #829ab1;
    width: 100%;
    outline: none;
    font-size: 14px;
    font-family: Roboto;
    line-height: 16px;
    text-align: center;
    letter-spacing: 0.14px;
    text-align: left;
    color: #000000;
    font-weight: 500;
  }
  & input.code-input {
    max-width: 250px;
    text-align: center;
  }
  & button {
    background: #005595;
    border-radius: 20px;
    width: 132px;
    height: 40px;
    border: none;
    font-size: 14px;
    line-height: 21px;
    text-align: center;
    color: #ffffff;
    outline: none;
  }
  & button:disabled {
    background: #86939c;
  }
  & button:disabled:hover {
    background: #86939c;
    cursor: not-allowed;
  }
  & button:hover {
    background: #0768b1;
    cursor: pointer;
  }
`;
