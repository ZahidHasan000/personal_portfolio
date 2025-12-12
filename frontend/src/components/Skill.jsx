import { useEffect } from "react";
import "./Skill.css";

// Importing TagCloud package
import TagCloud from "TagCloud";

const Skill = () => {
  // Animation settings for Text Cloud
  useEffect(() => {
    const container = ".tagcloud";
    const texts = [
      "HTML",
      "CSS",
      "SASS",
      "Bootstrap",
      "Tailwind",
      "JavaScript",
      "ReactJS",
      "NodeJS",
      "ThreeJS",
      "Machine Learning",
      "Python",
      "Flask",
      "Odoo",
      "Data Analysis",
      "JQuery",
      "ES6",
      "Figma",
      "GIT",
      "GITHUB",
    ];

    let options = {
      radius: 300,
      maxSpeed: "normal",
      initSpeed: "normal",
      keep: true,
    };

    // Adjust options for mobile devices
    if (window.innerWidth <= 768) {
      options = {
        radius: 195, // Adjust radius for smaller screens
        maxSpeed: "slow", // Adjust speed for smoother animation
        initSpeed: "slow", // Adjust initial speed for smoother animation
        keep: true,
      };
    }

    // Initialize TagCloud
    TagCloud(container, texts, options);

    // Cleanup function to remove the TagCloud instance on component unmount
    return () => {
      const tagCloudElement = document.querySelector(container);
      if (tagCloudElement) {
        tagCloudElement.innerHTML = "";
      }
    };
  }, []);

  return (
    <>
      <div className="text-shpere">
        {/* span tag className must be "tagcloud"  */}
        <span className="tagcloud"></span>
      </div>
    </>
  );
};

export default Skill;


