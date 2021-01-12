import React from "react";
import Delete from "./Delete";
import UpdateRecord from "./Update";

const ShowData = ({ NewArray, CurrentPage }) => {
  return NewArray.map((value, ind) => {
    const { userId, id, title, completed } = value;
    return (
      <tr key={ind}>
        <td>{userId}</td>
        <td>{id}</td>
        <td>{title}</td>
        <td>{String(completed)}</td>
        <td>
          <button key={ind} value={(CurrentPage - 1) * 10 + ind}>
            Delete Record
          </button>
        </td>
        <td>
          <button
            key={ind}
            onClick={new UpdateRecord((CurrentPage - 1) * 10 + ind)}
          >
            Update Record
          </button>
        </td>
      </tr>
    );
  });
};
export default ShowData;
