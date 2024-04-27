import Hero from "../components/Hero";
import Biography from "../components/Biography";
import Department from "../components/Department";
import MessageForm from "../components/MessageForm";

const Home = () => {
  return (
    <>
      <Hero
        title={
          "Welcome to Helath Medical Institute | Nepal's No.1 Trusted Helthcre Provider"
        }
        imageUrl={"/hero.png"}
      />
      <Biography imageUrl={"/about.png"} />
      <Department />
      <MessageForm />
    </>
  );
};
export default Home;
