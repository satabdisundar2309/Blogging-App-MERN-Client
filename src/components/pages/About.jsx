import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const About = () => {
  const { mode } = useContext(AppContext);
  return (
    <article className={mode === "dark" ? "dark-bg about" : "light-bg about"}>
      <div className="container">
        <h2>About</h2>
        <p>
          Hello You, I'm Satabdisundar Behera, a MERN stack web developer and a
          learner from Bhubaneswar, India. I enjoy building sites for small and
          large businesses. If you're a businessman seeking web presence or an
          employer looking to hire, you can get in touch with me here. I've
          described myself in the below section for you to know me better. I'm a
          tech geek with an enthusiasm to learn new technologies and implement
          them in day to day life. And this ardour towards technologies and tech
          world pushes me forward to stand out as a developer.
        </p>
        <p>
          Sports is one of those few things like technology that fascinates me a
          lot. It pushes me to believe in myself and motivates me to take my
          limits one step further and also hepls me to grow mentally.
        </p>
        <p>
          Cinema, Acting, Entertainment etc have been an integral part of my
          life as my father himself is an actor and I also have a big interest
          in filmmaking as I write scripts for short films and all.
        </p>
        <p>
          I did my primary schooling from Mallilata Das Nodal U.P.(M.E.) School,
          Subhadia. My high schooling was from Panchamuka High School,
          Jaleshwarpur. I completed my higher secondary education from the
          district junior college i.e. Bhadrak Junior College, Bhadrak.
        </p>

        <p>
          I consider myself as a fun loving person. The reason for that is, I
          enjoy my life in a very lively, lighthearted, spirited and playful
          way. Being funny and a laughter machine has helped me a lot to grow my
          friend circle and stay connected to people.
        </p>
      </div>
    </article>
  );
};

export default About;
