import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/FiveColumnWithInputForm.js";
import MainFeature1 from "components/features/TwoColWithButton.js";
// import MainFeature2 from "components/features/TwoColSingleFeatureWithStats.js";
// import MainFeature3 from "components/features/TwoColSingleFeatureWithStats2.js";
import Features from "components/features/ThreeColSimple.js";
// import Features from "components/features/ThreeColWithSideImage.js";
import TeamCardGrid from "components/cards/ProfileThreeColGrid.js";

import SupportIconImage from "images/support-icon.svg";
import ShieldIconImage from "images/shield-icon.svg";
import CustomerLoveIconImage from "images/simple-icon.svg";

const Subheading = tw.span`uppercase tracking-wider text-sm`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <MainFeature1
        subheading={<Subheading>About Pantry</Subheading>}
        heading="Meet the team."
        description="Here at Pantry we aim to carve a new branch into the recipe market. We are a team of six developers who are passionate about creating a beautiful and functional website for users to find new recipes. Our goal is for users to spend less time searching and more time cooking."
        buttonRounded={false}
        primaryButtonText="Meet the Team"
        imageSrc="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        primaryButtonUrl={<a href="team"></a>}
      />
      <MainFeature1
        subheading={<Subheading>Our Vision</Subheading>}
        heading="We aim to disrupt the design space."
        description=" As a team, we wanted to create a website that allows users to find recipes based on ingredients they already have. Current websites that attempt to do this are confusing and cumbersome to navigate. This market is in its infancy and can be improved upon in many ways."
        buttonRounded={false}
        primaryButtonText="Contact Us"
        imageSrc="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        primaryButtonUrl="/contact"
        textOnLeft={false}
      />
      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="We follow these."
        description="Our promises to the customer:"
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Timely Support",
            description: "Feel free to contact us with any questions or concerns. We will respond as soon as possible."
          },
          {
            imageSrc: ShieldIconImage,
            title: "Strong Teams",
            description: "Our team strives to continuously improve our skills and learn new technologies. We are always looking for new ways to improve Pantry."
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Customer Satisfaction",
            description: "We want to create a website that is easy to use and provides value to our users. We will continue to improve Pantry to meet your needs."
          },
        ]}
        linkText=""
      />
      <TeamCardGrid
        subheading={<Subheading>The Team</Subheading>}
      />
      
      <Footer />
    </AnimationRevealPage>
  );
};
