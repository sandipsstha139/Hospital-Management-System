const Biography = ({ imageUrl }) => {
  return (
    <div className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="" />
      </div>
      <div className="banner">
        <p>Biography</p>
        <h3>Who We Are</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
          itaque dolores alias dicta molestias! Est sint doloribus amet
          asperiores, modi error id optio repellat harum maxime excepturi
          soluta. Inventore corrupti expedita pariatur cum est ab. Mollitia
          reprehenderit corporis dolores voluptatem? Minus ex necessitatibus ab
          possimus soluta voluptatibus repellat quam cum?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat,
          perspiciatis.
        </p>
        <p>Lorem ipsum dolor sit amet.</p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Asperiores
          dolor quos provident. Sit corrupti odit optio totam veritatis, quaerat
          quis debitis itaque iure eum, aliquid libero voluptates illum porro
          consequatur architecto enim possimus laudantium blanditiis?
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, atque!
        </p>
      </div>
    </div>
  );
};
export default Biography;
