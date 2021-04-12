import Image from "next/image";

import classes from "./hero.module.css";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/am.jpg"
          alt="Slobodan"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Slobodan</h1>
      <p>
        A blog about web development - especialy frontend frameworks like React
      </p>
    </section>
  );
};

export default Hero;
