import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";



// This is the styling for the form
const Container = styled.div` display: flex; flex-direction: column; align-items: start;`;
const ProfilePicture = styled.img` width: 150px; height: 150px; border-radius: 50%; object-fit: cover;`;
const UserInfo = styled.div` display: flex; flex-direction: column; align-items: start; margin-top: 20px;`;
const Label = styled.div` font-weight: bold; margin-bottom: 5px;`;
const Info = styled.div` margin-bottom: 10px;`;

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


export default ({
  userData = null
}) => {
// Checks to see If userData is null or undefined
  if (!userData) {
    return <div>Loading...</div>;
  }
  // If userData is not null or undefined, it will return the following
  return (
    <Container>
      <ProfilePicture src={userData.profilePicture ? userData.profilePicture : "/profilepic.png"} alt="Profile Picture" />
      <UserInfo>
        <Label>Name:</Label>
        <Info>{userData.fullName}</Info>
        <Label>Bio:</Label>
        <Info>{userData.bio}</Info>
        <Label>Email:</Label>
        <Info>{userData.emailAddress}</Info>
        <Label>Username:</Label>
        <Info>{userData.username}</Info>
        <Label>Date of Birth:</Label>
        <Info>{userData.dob}</Info>
        <Label>Gender:</Label>
        <Info>{userData.gender}</Info>
        <Label>Country/Region:</Label>
        <Info>{userData.countryRegion}</Info>
        <Button to="/EditUser" state= {{user:userData}}>Edit Profile</Button>
      </UserInfo>
    </Container>
  );
};