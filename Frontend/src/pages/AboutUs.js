import React from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import styled from "styled-components"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import Header from "components/headers/light.js";
import Footer from "components/footers/MiniCenteredFooter";
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
        description="We are a group of students from Metropolitan State University of Denver. We are passionate about technology and wish to design a website dedicated to delivering delicious recipes in a simpler and more practical manner so users can spend more time cooking and less time researching and gathering ingredients."
        buttonRounded={false}
        primaryButtonText="See Portfolio"
        imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
      />
      <MainFeature1
        subheading={<Subheading>Our Vision</Subheading>}
        heading="We aim to disrupt the market."
        description="Most cooking websites currently do not have search filters to account for what ingredients people are already in their kitchen. This means going out to purchase additional ingredients after they finding a recipe. We aim to change that by providing a website that allows users to search for recipes based on the ingredients they already have available."
        buttonRounded={false}
        primaryButtonText="Contact Us"
        imageSrc="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
        textOnLeft={false}
        primaryButtonUrl="/contact"
      />
      <Features
        subheading={<Subheading>Our Values</Subheading>}
        heading="Our guarantee."
        description="To ensure a quality product, our team is dedicated to standing by these priniples."
        cards={[
          {
            imageSrc: SupportIconImage,
            title: "Timely Support",
            description: "Users can submit any questions, comments, or concerns and expect a quick response."
          },
          {
            imageSrc: ShieldIconImage,
            title: "Strong Teams",
            description: "Our teams is founded on the principles of collaboration and communication. We are dedicated to working together to create a quality product."
          },
          {
            imageSrc: CustomerLoveIconImage,
            title: "Customer Satisfaction",
            description: "The customer is our number one priority. We are dedicated to creating a product that is easy to use and provides a positive experience."
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
