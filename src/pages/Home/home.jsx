import React from "react";
import Hometile from "../../components/HomeTile/homeTile";
import "./home.css";

const Home = () => {
  const projects = [
    {
      _id: "663b30241a37d941d18462",
      title: "test title 1",

      createdAt: "2024-05-08T07:56:20.544Z",
      updatedAt: "2024-05-08T07:56:20.544Z",
      __v: 0,
    },
    {
      _id: "663b30241ad941d18467b2",
      title: "test title 2",

      createdAt: "2024-05-08T07:56:20.544Z",
      updatedAt: "2024-05-08T07:56:20.544Z",
      __v: 0,
    },
    {
      _id: "663b30241a37d941d18467b2",
      title: "test title 3",

      createdAt: "2024-05-08T07:56:20.544Z",
      updatedAt: "2024-05-08T07:56:20.544Z",
      __v: 0,
    },
  ];

  return (
    <div className="homePage">
      <h1>Projects</h1>
      {projects.map((item, key) => {
        return <Hometile tilename={item.title} key={item._id} />;
      })}
    </div>
  );
};

export default Home;
