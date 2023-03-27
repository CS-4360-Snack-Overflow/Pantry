import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin-top: 20px;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Info = styled.div`
  margin-bottom: 10px;
`;

const Button = styled(Link)`
background-color: #F58023;
color: white;
font-weight: bold;
padding: 10px 20px;
border: none;
border-radius: 5px;
margin-top: 20px;
cursor: pointer;
`;

const UserPage = () => {
  return (
    <Container>
      <ProfilePicture src="https://via.placeholder.com/150" alt="Profile Picture" />
      <UserInfo>
        <Label>Name:</Label>
        <Info>Name Will Go Here</Info>
        <Label>Bio:</Label>
        <Info>User Bio Will go Here.</Info>
        <Label>Email:</Label>
        <Info>Email Here</Info>
        <Label>Username:</Label>
        <Info>UserName Here</Info>
        <Label>Password:</Label>
        <Info>PassPass</Info>
        <Label>Date of Birth:</Label>
        <Info>01/01/0000</Info>
        <Label>Gender:</Label>
        <Info>Male</Info>
        <Label>Country/Region:</Label>
        <Info>United States</Info>
        <Button to="/">Edit Profile</Button>
      </UserInfo>
    </Container>
  );
};

export default UserPage;
