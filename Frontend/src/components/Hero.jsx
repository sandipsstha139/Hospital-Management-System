const Hero = ({ title, imageUrl }) => {
  return (
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          repudiandae similique, pariatur mollitia ipsa quidem perspiciatis id
          eum hic in culpa quae distinctio voluptate voluptates iste quo.
          Voluptatum rem laborum quisquam exercitationem ratione, dolore, illum
          perferendis voluptatem harum aliquid, modi nihil minima voluptatibus
          illo. Voluptas amet odit adipisci animi doloribus?
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/vector.png" alt="" />
        </span>
      </div>
    </div>
  );
};
export default Hero;
