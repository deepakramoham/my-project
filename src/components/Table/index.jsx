import Input from "../Input";
import { IoAdd } from "react-icons/io5";
import { useEffect, useState } from "react";

const Table = ({ tableColumns, data, onAddClick }) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const columnData = [
    { header: "Name", accessor: "name" },
    { header: "Contact", accessor: "contact" },
    { header: "Gender", accessor: "gender" },
    { header: "Skills", accessor: "skills" },
    { header: "Course", accessor: "course" },
  ];

  useEffect(() => {
    const filterData = data?.filter((row) =>
      tableColumns?.some((col) => {
        const value = row[col.accessor];

        return (
          value &&
          value?.toString()?.toLowerCase()?.includes(search?.toLowerCase())
        );
      }),
    );

    setFilteredData(filterData);
  }, [data, search]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "5px",
        }}
      >
        <div style={{ width: "100%" }}>
          <Input
            name={"search"}
            placeholder="Search . . . "
            type="text"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="p-2">
          <button className="btn btn-success" onClick={onAddClick}>
            <IoAdd style={{ fontSize: "2em" }} />
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            {tableColumns?.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData?.length > 0 ? (
            filteredData?.map((row, index) => (
              <tr key={index}>
                {tableColumns?.map((col, index) => (
                  <td key={index}>
                    {col?.render ? col?.render(row) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td>No data found</td>
            </tr>
          )}
        </tbody>
      </table>
    </>
  );
};

export default Table;
