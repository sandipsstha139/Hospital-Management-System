import Biography from '../components/Biography';
import Hero from '../components/Hero';

const AboutUs = () => {
  return (
    <>
      <Hero
        title={
          "Learn More About Us | Nepal's No.1 Trusted Helthcre Provider"
        }
        imageUrl={"/about.png"}
      />
      <Biography imageUrl={"/whoweare.png"} />
      
    </>
  );
};
export default AboutUs