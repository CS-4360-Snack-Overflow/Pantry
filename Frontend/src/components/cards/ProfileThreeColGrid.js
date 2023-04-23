import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings";
import {SectionDescription} from "components/misc/Typography";
//import { ReactComponent as TwitterIcon} from "images/twitter-icon.svg";
import { ReactComponent as LinkedinIcon} from "images/linkedin-icon.svg";
import { ReactComponent as GithubIcon } from "images/github-icon.svg";
import JadenHeadShot from "images/J-500H-70Q.jpg";
import CesarHeadShot from "images/CesarSquare.png";
import JoseHeadShot from "images/Jose-500H-80Q.jpg";
import WolfyHeadShot from "images/Wolfy-500H-70Q.jpg";
import DJHeadShot from "images/DJSquare.png";
import RyanHeadShot from "images/Ryan-500H-70Q.jpg";

const HeadingContainer = tw.div``
const Heading = tw(SectionHeading)``
const Subheading = tw(SubheadingBase)`text-center mb-3`
const Description = tw(SectionDescription)`mx-auto text-center`

const Cards = tw.div`flex flex-wrap flex-row justify-center sm:max-w-2xl lg:max-w-5xl mx-auto`
const Card = tw.div`mt-24 w-full sm:w-1/2 lg:w-1/3 flex flex-col items-center`
const CardImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`w-64 h-64 bg-contain bg-center rounded`}
`
const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-primary-500`}
  }
  .name {
    ${tw`mt-1 text-xl font-medium text-gray-900`}
  9
`

const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-primary-500 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`

export default ({
  heading = "Meet These Up and Coming Graduates.",
  subheading = "Our Team",
  description = " ",
  cards = [
    {
      imageSrc: JadenHeadShot,
      position: "UI-UX Designer",
      name: "Jaden Cua",
      links: [
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com/Jadencua",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: CesarHeadShot,
      position: "UI-UX Designer",
      name: "Cesar Huizar",
      links: [
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com/chuizar",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: RyanHeadShot,
      position: "UI-UX Designer",
      name: "Ryan Baertlein",
      links: [
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com/rdaniel58",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: WolfyHeadShot,
      position: "Back-end Designer",
      name: "Jonathon Fiorini",
      links: [
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com/Wolfy319",
          icon: GithubIcon,
        },
      ],
    },
    {
      imageSrc: JoseHeadShot,
      position: "Back-end Designer",
      name: "Jose Rios",
      links: [
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com/ylATeRTyl",
          icon: GithubIcon,
        },
      ],
    },

    {
      imageSrc: DJHeadShot,
      position: "Back-end Designer",
      name: "Diptanshu Giri",
      links: [
        {
          url: "https://linkedin.com",
          icon: LinkedinIcon,
        },
        {
          url: "https://github.com/dgiri12",
          icon: GithubIcon,
        },
      ],
    },
  ]
}) => {
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {subheading && <Subheading>{subheading}</Subheading>}
          {heading && <Heading>{heading}</Heading> }
          {description && <Description>{description}</Description> }
        </HeadingContainer>
        <Cards>
          {cards.map((card, index) => (
            <Card key={index}>
              <CardImage imageSrc={card.imageSrc} />
              <CardContent>
                <span className="position">{card.position}</span>
                <span className="name">{card.name}</span>
                <CardLinks>
                  {card.links.map((link, linkIndex) => (
                    <a key={linkIndex} className="link" href={link.url}>
                      <link.icon className="icon" />
                    </a>
                  ))}
                </CardLinks>
              </CardContent>
            </Card>
          ))}
        </Cards>
      </ContentWithPaddingXl>
    </Container>
  );
};
