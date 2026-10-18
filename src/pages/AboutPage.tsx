import { Hero } from "../components/home/Hero";
import { Container } from "../components/layout/Container";

export function AboutPage() {
  return (
    <>
      <Hero
       label="ABOUT ME"
       title="Stein Arild"
       hideCTA
       description="More detailed information on my background, skills, and experience as a frontend developer. Learn about my journey, the technologies I work with, and what drives me to create exceptional web experiences."
       />

      <Container>
        <h2>Incoming about me content here...</h2>
      </Container>
    </>
  );
}