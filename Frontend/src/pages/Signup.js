import React, {useState} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-pantry.svg";
import logo from "images/logo-p.svg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { uploadImage } from "helpers/RecipeService";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm 
  focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-1/2 py-4 rounded-lg mb-3 mx-auto hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;
const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  ${tw`mx-auto`}
`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign Up For Pantry",
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "#",
  privacyPolicyUrl = "#",
  signInUrl = "/login",
  fields = {
    "fullName" : "Name",
    "emailAddress": "Email",
    "username": "Username",
    "password": "Password",
    "bio": "Bio",
    "phoneNumber": "Phone",
    "dateOfBirth": "DOB",
    "countryRegion": "Country",
    "gender" : "Gender"
  }
}) => {
  const [image, setImage] = useState(null)
  const [imUrl, setUrl] = useState("/placeholder.webp")

  function handleFileChange(e) {
    if(e.target.files) {
      setImage(e.target.files[0]);
    }
  }

  async function handleFileUpload(e) {
    e.preventDefault()
    let form = new FormData();
    if(image) {
      form.append('files', image);
    let res = await uploadImage(form);
    res = await res.json().then((result) =>{
      setUrl(__dirname + result.path)
    })
    }
  }

  return (
  <AnimationRevealPage>
    <Container>
      <Content>
        <MainContainer>
          <LogoLink href={logoLinkUrl}>
            <LogoImage src={logo} />
          </LogoLink>
          <MainContent>
            <Heading>{headingText}</Heading>
            <FormContainer>
              <Form action="/user/userCreate" method="POST">
                <label class="mx-auto">Profile picture</label>
                <ProfilePicture src={imUrl} alt="Profile Picture" />
                <div class="flex-row">
                <Input type="file" onChange={handleFileChange} required></Input>
                <SubmitButton type="add" onClick={handleFileUpload}>Upload Photo</SubmitButton>
                </div>
                <Input type="text" hidden={true} id="profilePicture" name="profilePicture" value={imUrl}></Input>
                {Object.keys(fields).map((field, index) => (
                  <div key={index}>
                    <label>{fields[field]}</label>
                    <Input type="text" id={field} name={field} required></Input>
                  </div>
                ))}
                <SubmitButton type="submit">
                  <SubmitButtonIcon className="icon" />
                  <span className="text">{submitButtonText}</span>
                </SubmitButton>
                <p tw="mt-6 text-xs text-gray-600 text-center">
                  I agree to abide by Snack Overflow's{" "}
                  <a href={tosUrl} tw="border-b border-gray-500 border-dotted">
                    Terms of Service
                  </a>{" "}
                  and its{" "}
                  <a href={privacyPolicyUrl} tw="border-b border-gray-500 border-dotted">
                    Privacy Policy
                  </a>
                </p>
                <p tw="mt-8 text-sm text-gray-600 text-center">
                  Already have an account?{" "}
                  <a href={signInUrl} tw="border-b border-gray-500 border-dotted">
                    Sign In
                  </a>
                </p>
              </Form>
            </FormContainer>
          </MainContent>
        </MainContainer>
        <IllustrationContainer>
          <IllustrationImage imageSrc={illustrationImageSrc} />
        </IllustrationContainer>
      </Content>
    </Container>
  </AnimationRevealPage>
)};
