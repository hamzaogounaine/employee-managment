'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Ellipsis, Plus } from 'lucide-react';
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddDialog } from './AddModal';
import { EmployeesSkeleton } from './Skeleton';

const checkLogin = async () => {
    try {
        const users = await fetch('http://localhost:3000/api/employeeRegister', { cache: 'no-store' } );
        const data = await users.json();
        return data;
    } catch (error) {
        console.log(error)
        return []

    }
}

const getEmployees = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/employees', { cache: 'no-store' });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

const Page = () => {
    const [employees, setEmployees] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [id, setId] = useState(null);
    const [employeesLogin , setEmployeesLogin] = useState([]);

    useEffect(() => {
        const fetchEmployees = async () => {
            const data = await getEmployees();
            setEmployees(data);
            const logins = await checkLogin();
            setEmployeesLogin(logins);
        };
        fetchEmployees();
    }, []);

    const checkExistingLogin = (id) => {
        return employeesLogin.find(user => user._id === id);
    }
    return (
        <div>
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold my-3">Employees</h1>
                <Link href={'/adminSpace/employees/add'}>
                    <Button className="flex justify-between items-center">
                        <Plus /> Add employee
                    </Button>
                </Link>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Position</TableHead>
                        <TableHead>Department</TableHead>
                        <TableHead className="text-center">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {employees.length === 0 && (
                        new Array(4).fill(0).map((_, index) => (
                            <TableRow key={index}>
                                <TableCell colSpan={4}>
                                    <EmployeesSkeleton />
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                    {employees.map((employee) => (
                        <TableRow key={employee.id}>
                            <TableCell className="hover:underline cursor-pointer">
                                <Link href={`/adminSpace/employees/${employee._id}`}>{employee.name}</Link>
                            </TableCell>
                            <TableCell>{employee.position}</TableCell>
                            <TableCell>{employee.department}</TableCell>
                            <TableCell className="text-center">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <Ellipsis className="opacity-75" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem onClick={() => { setIsOpen(true); setId(employee._id) }} disabled={checkExistingLogin(employee._id)}>
                                            Create a login
                                        </DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => setIsOpen(true)}>
                                            Edit a login
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="text-red-500">
                                            Delete Employee
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isOpen && <AddDialog setIsOpen={setIsOpen} id={id} />}
        </div>
    );
};

export default Page;
