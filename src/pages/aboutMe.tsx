import { PORTFOLIO_CONFIG } from "../config/portfolioConfig";

export function LeftAboutMeText() {
  return (
    <>
    <p className="leftSide__p">
      {PORTFOLIO_CONFIG.aboutMeLeft}
    </p>
    </>
  );
}

export const rightAboutMeText = `aboutMe.tsx`;
