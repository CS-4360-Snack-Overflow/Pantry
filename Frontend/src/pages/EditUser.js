import React, { useState } from "react";
import styled from "styled-components";
import UserPage from "components/forms/UserForm";
import { SectionHeading } from "components/misc/Headings.js";
import tw from "twin.macro";


const Heading = tw(SectionHeading)`mt-4 font-black text-right text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Label = styled.div`
  font-weight: bold;
  margin-bottom: 5px;
`;

const Input = styled.input`
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #F58023;
  color: white;
  font-weight: bold;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  cursor: pointer;
`;

const EditUser = () => {
const [name, setName] = useState("Name Will Go Here");
const [bio, setBio] = useState("User Bio Will go Here.");
const [email, setEmail] = useState("Email Here");
const [username, setUsername] = useState("UserName Here");
const [password, setPassword] = useState("PassPass");
const [dob, setDob] = useState("01/01/0000");
const [gender, setGender] = useState("Male");
const [country, setCountry] = useState("United States");

const handleSubmit = (event) => {
event.preventDefault();
// save user information to the server/database
// and redirect to the user page
};

return (
<Container>
<form onSubmit={handleSubmit}>
<Label>Name:</Label>
<Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
<Label>Bio:</Label>
<Input type="text" value={bio} onChange={(e) => setBio(e.target.value)} />
<Label>Email:</Label>
<Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
<Label>Username:</Label>
<Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
<Label>Password:</Label>
<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
<Label>Date of Birth:</Label>
<Input type="date" value={dob} onChange={(e) => setDob(e.target.value)} />
<Label>Gender:</Label>
<select value={gender} onChange={(e) => setGender(e.target.value)}>
<option value="Male">Male</option>
<option value="Female">Female</option>
<option value="Other">Other</option>
</select>
<Label>Country/Region:</Label>
<Input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
<Button type="submit">Save Changes</Button>
</form>
</Container>
);
};

export default EditUser;