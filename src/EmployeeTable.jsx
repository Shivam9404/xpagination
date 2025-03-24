import React, { useState, useEffect } from "react";
import './EmployeeTable.module.css';

function EmployeeTable() {

    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("failed to fetch data");
                }
                return response.json();
            })
            .then((data) => setData(data))
            .catch(() => alert("failed to fetch data"));
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div class="container">
            <h1>Employee Data Table</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((employee) => (
                        <tr key={employee.id}>
                            <td>{employee.id}</td>
                            <td>{employee.name}</td>
                            <td>{employee.email}</td>
                            <td>{employee.role}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className={currentPage === 1 ? "disabled" : ""}
                >
                    Previous
                </button>
                <span className="page-number"> {currentPage} </span>
                <button
                    onClick={nextPage}
                    disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                    className={currentPage === Math.ceil(data.length / itemsPerPage) ? "disabled" : ""}
                >
                    Next
                </button>
            </div>

        </div>
    )
};
export default EmployeeTable;