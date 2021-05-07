import React from "react";
import { useTheme } from "styled-components";
import Group from "../../elements/Group";

const About: React.FC = () => {
  const theme = useTheme();

  return (
    <Group spacing={theme.spacing[5]}>
      <Group direction="column" spacing={theme.spacing[5]}>
        <h4>Hi there! I&apos;m Hristo Hristov</h4>
        <p>
          I am savvy, self-motivated, and quality-driven full stack .NET developer specializing in turning ideas into
          software solutions. Possesing a creative mind helps me find innovative solutions to complex problems while
          achieving quality that exceeds expecations.
        </p>
      </Group>
      <Group direction="column" spacing={theme.spacing[5]}>
        <h4>My technology stack includes:</h4>
      </Group>
    </Group>
  );
};

export default About;
