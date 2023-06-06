import React from "react";

export interface helloProps {
  name: string;
}

function Home({ name }: helloProps) {
  return (
    <div>
      <h1 style={{ justifyContent: "center", display: "flex" }}>
        Hello {name}
      </h1>
    </div>
  );
}

export default Home;
export {};
// TODO DOROBIC ZEBY PO ZALOGOWANIU WYSKAKIWALO HELLO IMIE
