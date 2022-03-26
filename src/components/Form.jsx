import { useState, useEffect } from "react";

const Form = () => {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dept, SetDept] = useState("");
  const [role, setRole] = useState("");
  const [salary, setSalary] = useState("");
  const [data, setData] = useState([]);

  const [disData, setDisData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    // handleShow(1);
    fetch(`http://localhost:3001/EmployeeList`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setDisData(res);
      })
      .catch((err) => console.log(err));
  };
  const handleAdd = () => {
    const payload = {
      Name: name,
      Gender: gender,
      Dept: dept,
      Role: role,
      Salary: salary,
    };
    const paylodjson = JSON.stringify(payload);
    fetch(` http://localhost:3001/EmployeeList`, {
      method: "Post",
      body: paylodjson,
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        getData();
      })
      .catch((err) => console.log(err));
    setName("");
    setGender("");
    SetDept("");
    setRole("");
    setSalary("");
  };
  // ****************************************************************
  const showAll = () => setDisData(data);
  const showmarketing = () => {
    let newData = data.filter((emp) => emp.Dept === "Marketing");
    // console.log(newData);
    setDisData(newData);
  };
  const showHr = () => {
    let newData = data.filter((emp) => emp.Dept === "HR");
    setDisData(newData);
    // console.log(newData);
  };
  const showIt = () => {
    let newData = data.filter((emp) => emp.Dept === "IT");
    // console.log(newData);
    setDisData(newData);
  };
  const showFinance = () => {
    let newData = data.filter((emp) => emp.Dept === "Finance");
    // console.log(newData);
    setDisData(newData);
  };
  const AscendingSort = () => {
    let newData = disData.sort((a, b) => b.Salary - a.Salary);

    console.log(newData);
    setDisData([...newData]);
    // setDisData(newData);
    console.log(newData);
  };
  const DescendingSort = () => {
    let newData = disData.sort((a, b) => {
      return a.Salary - b.Salary;
    });
    setDisData([...newData]);
  };
  return (
    <div className="APP">
      <h1>Enter Employee Details</h1>
      <div className="inputBox">
        <input
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input
          placeholder="gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <br />
        <input
          placeholder="departement"
          value={dept}
          onChange={(e) => SetDept(e.target.value)}
        />
        <br />
        <input
          placeholder="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
        <br />
        <input
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />
        <br />
        <button onClick={handleAdd}>ADD EMPLOYEE</button>
      </div>
      <br />
      <br />
      <button onClick={showAll}>Show All Departments</button>
      <button onClick={showmarketing}>Show Marketing</button>
      <button onClick={showHr}>Show HR</button>
      <button onClick={showIt}>Show IT</button>
      <button onClick={showFinance}>Show Finance</button>
      <br />

      <br />
      <button onClick={AscendingSort}>Sort By salary Ascending</button>
      <button onClick={DescendingSort}>Sort By salary Descending</button>
      <div className="Card1">
        {disData.map((item) => {
          return (
            <div className="card" key={item.id}>
              <p>Name : {item.Name}</p>
              <p>Gender : {item.Gender}</p>
              <p>Departement : {item.Dept}</p>
              <p>Role : {item.Role}</p>
              <p>Salary : {item.Salary}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Form;
