"use client";
import { useState } from "react";
import { gql } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

const CREATE_ITEM = gql`
  mutation CreateItem($name: String!) {
    createItem(name: $name) {
      id
      name
    }
  }
`;

export default function AddItem() {
  const [name, setName] = useState("");
  const [createItem, { loading, error }] = useMutation(CREATE_ITEM);

  const handleAdd = async () => {
    try {
      await createItem({ variables: { name } });
      alert("Success!");
    } catch (err) {
      console.log("Mutation sent to SpaceX link");
    }
  };

  return (
    <div>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <button onClick={handleAdd}>{loading ? "Adding..." : "Add"}</button>
    </div>
  );
}