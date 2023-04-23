import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import React, { useState } from "react";
import styled from "styled-components";
import { SectionHeading } from "components/misc/Headings.js";
import tw from "twin.macro";
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
import { useEffect } from 'react';
import { useLocation} from "react-router";

const Heading = tw(SectionHeading)`mt-4 font-black text-right text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Container = styled.div` display: flex; flex-direction: column; align-items: center; justify-content: center;
  border: 2px solid orange; padding: 70px; border-radius: 100px; margin-top: 50px; max-width: 100%; 100% width: 100%; margin-bottom: 50px;`;
const Row = styled.div` display: flex; flex-wrap: wrap; margin-bottom: 10px;`;
const Column = styled.div` flex: 1; margin-right: 10px;`;
const Label = styled.div` font-weight: bold; margin-bottom: 5px;`;
const Input = styled.input` margin-bottom: 10px;`;
const Button = styled.button` position: center; top: 60%; left: 50%;  background-color: #F58023; color: white; font-weight: bold;
padding: 10px 20px; border: none; border-radius: 50px; cursor: pointer; width: fit-content; left: 0; right: 0; margin-left: auto; margin-right: auto;`;

//Set's up a User Edit Form that shows the user's information and allows them to edit it
const EditUser = () => {
const user = useLocation().state.user;
const [gender, setGender] = useState(user.gender);


  useEffect(()=>{
    fetch('/user/testAuth')
      .then(response => response.json())
      .then(data => {
	if(!data.active) {
	 window.location.href = "/login";
	}
      });
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault();
    // save user information to the server/database
    // and redirect to the user page
  };

//Sets up the body of the form to receive the user's information
return (
    <AnimationRevealPage>

        <Header/>

    <Container>

        <Heading>Edit User</Heading>
            <form action="/user/userUpdate" method="POST">
        <Row>

          <Column>
            <Label>Name:</Label>
            <Input type="text" id="fullName" name="fullName" defaultValue={user.fullName} />
          </Column>
          <Column>
            <Label>Bio:</Label>
            <Input type="text" id="bio" name="bio" defaultValue={user.bio}  />
          </Column>
          <Column>
            <Label>Email:</Label>
            <Input type="email" id="emailAddress" name="emailAddress" defaultValue={user.emailAddress}  />
          </Column>
          <Column>
            <Label>Username:</Label>
            <Input type="text" id="username" name="username" defaultValue={user.username}  />
          </Column>
        </Row>
        <Row>
          <Column>
            <Label>Password:</Label>
            <Input type="password" id="password" name="password" defaultValue={user.password}  />
          </Column>
          <Column>
            <Label>Date of Birth:</Label>
            <Input type="date" id="dob" name="dob" defaultValue={user.dob}  />
          </Column>
          <Column>
            <Label>Gender:</Label>
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                </select>
          </Column>
            <Column>
                <Label>Country/Region:</Label>
                    <Input type="text" id="countryRegion" name="countryRegion" defaultValue={user.countryRegion} />
            </Column>
        </Row>
            <Button type="submit">Save Changes</Button>
            <Button type="sign out">Sign Out</Button>
        </form>
    </Container>
        <Footer/>
    </AnimationRevealPage>
);
};
//Exports the form to be used in other files
export default EditUser;
