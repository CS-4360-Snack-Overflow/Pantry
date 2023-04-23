import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import {css} from "styled-components/macro"; //eslint-disable-line
import illustration from "images/login-pantry.svg";
import logo from "images/logo-p.svg";
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Container = tw(ContainerBase)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none 
  focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;

const IllustrationImage = styled.div`
  ${props => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign In To Pantry",
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "#",
  signupUrl = "/signup",

}) =>  {
  const ErrorPopup = styled.div`
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 10px;
  margin-bottom: 10px;
`;
    const [error, setError] = useState('');
    const navigate = useNavigate();
    async function handleLogin(event) {
      event.preventDefault();
      
      try {
        const response = await axios.post('/user/userLoginProc', {
          username: event.target.username.value,
          password: event.target.password.value
        });
        console.log(response.data);
        if (response.data.message == 'valid') {
          navigate('/user')
        } else{
          setError('Invalid username or password. Please try again.');
        }
      } catch (error) {
        console.error(error);
        setError('Invalid username or password. Please try again.');
      }
    }
  
  // <AnimationRevealPage>
  //   <Container>
  //     <Content>
  //       <MainContainer>
  //         <LogoLink href={logoLinkUrl}>
  //           <LogoImage src={logo} />
  //         </LogoLink>
  //         <MainContent>
  //           <Heading>{headingText}</Heading>
  //           <FormContainer>
  //             <Form action="/user/userLoginProc" method="POST">
  //               <Input type="username" placeholder="Username" id="username" name="username" required />
  //               <Input type="password" id="password" name="password" required />
  //               <SubmitButton type="submit">
  //                 <SubmitButtonIcon className="icon" />
  //                 <span className="text">{submitButtonText}</span>
  //               </SubmitButton>
  //             </Form>
  //             <p tw="mt-6 text-xs text-gray-600 text-center">
  //               <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
  //                 Forgot Password ?
  //               </a>
  //             </p>
  //             <p tw="mt-8 text-sm text-gray-600 text-center">
  //               Dont have an account?{" "}
  //               <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
  //                 Sign Up
  //               </a>
  //             </p>
  //           </FormContainer>
  //         </MainContent>
  //       </MainContainer>
  //       <IllustrationContainer>
  //         <IllustrationImage imageSrc={illustrationImageSrc} />
  //       </IllustrationContainer>
  //     </Content>
  //   </Container>
  // </AnimationRevealPage>


    
    return (
      <div>
      <AnimationRevealPage>
        <Container>
          <Content>
            <MainContainer>
              <LogoLink href={logoLinkUrl}>
                <LogoImage src={logo} />
              </LogoLink>
              <MainContent>
                <Heading>{headingText}</Heading>
                {error && (
                  <ErrorPopup>{error}</ErrorPopup>
                )}
                <FormContainer>
                  <form onSubmit={handleLogin}>
                    <Input type="username" placeholder="Username" id="username" name="username" required />
                    <Input type="password" id="password" name="password" required />
                    <SubmitButton type="submit">
                      <SubmitButtonIcon className="icon" />
                      <span className="text">{submitButtonText}</span>
                    </SubmitButton>
                  </form>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    <a href={forgotPasswordUrl} tw="border-b border-gray-500 border-dotted">
                      Forgot Password ?
                    </a>
                  </p>
                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Dont have an account?{" "}
                    <a href={signupUrl} tw="border-b border-gray-500 border-dotted">
                      Sign Up
                    </a>
                  </p>
                </FormContainer>
              </MainContent>
            </MainContainer>
            <IllustrationContainer>
              <IllustrationImage imageSrc={illustrationImageSrc} />
            </IllustrationContainer>
          </Content>
        </Container>
      </AnimationRevealPage>
      </div>
    );
};