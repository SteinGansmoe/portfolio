import { Hero } from "../components/home/Hero";
import { Container } from "../components/layout/Container";

export function ProjectsPage() {
  return (
    <>
      <Hero
      label="SELECTED WORK"
       title="Projects"
       description="A collection of projects I've built, highlighting my skills and experience with modern web technologies."
       hideCTA
      />

      <Container>
        <h2>Incoming content here...</h2>
      </Container>
    </>
  );
}