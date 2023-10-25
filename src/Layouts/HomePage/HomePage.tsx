import { Carousel } from "./Carousel";
import { Hero } from "./Hero";
import { Heros } from "./Heros";
import { LibraryServices } from "./LibraryServices";

export const HomePage = () => {
  return (
    <>
      <Hero />
      <Carousel />
      <Heros />
      <LibraryServices />
    </>
  );
}
