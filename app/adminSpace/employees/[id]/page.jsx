import React from 'react'

const getEmployeeDetails = async (id) => {
    const baseUrl = 'http://localhost:3000'; // Adjust for your environment
    const response = await fetch(`${baseUrl}/api/employees/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch employee details');
    }

    return data;
};


const page = async ({ params }) => {
    const data = await getEmployeeDetails(params.id);
    console.log(data)
  return (
    <div>
        <div>
            <h1>Employee Details</h1>
            <p><strong>ID:</strong> {data._id}</p>
            <p><strong>Name:</strong> {data.name}</p>
            <p><strong>Position:</strong> {data.position}</p>
            <p><strong>Department:</strong> {data.department}</p>
            <p><strong>Salary:</strong> ${data.salary}</p>
            <p><strong>Date of Joining:</strong> {new Date(data.dateOfJoining).toLocaleDateString()}</p>
        </div>
    </div>
  )
}

export default page