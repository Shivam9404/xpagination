import React, { useState, useEffect } from "react";
import styles from "./EmployeeTable.module.css";

function EmployeeTable() {
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
            .then((response) => response.json())
            .then((data) => setData(data))
            .catch(() => alert("Failed to fetch data"));
    }, []);

    const totalPages = Math.ceil(data.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const nextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const prevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    return (
        <div className={styles.container}>
            <h1>Employee Data Table</h1>
            <table className={styles.table}>
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
            <div className={styles.pagination}>
                <button onClick={prevPage} disabled={currentPage === 1}>Previous</button>
                <button>{currentPage}</button>
                <button onClick={nextPage} disabled={currentPage >= totalPages}>Next</button>
            </div>
        </div>
    );
}

export default EmployeeTable;
