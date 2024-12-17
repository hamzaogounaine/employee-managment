'use client'
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import React, { useState } from 'react';

const Page = () => {
    const [formData, setFormData] = useState({
        name: '',
        position: '',
        department: '',
        salary: ''    
    });
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSelectChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        await fetch('/api/employees', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((response) => {
            if (response.ok) {
                setError('')
                setSuccess('Employee added successfully');
                setFormData({
                    name: '',
                    position: '',
                    department: '',
                    salary: '',
                });
            }
        }).catch((error) => {
            setError('Error while adding employee');
        }).finally(() => {setLoading(false)});
    };

    return (
        <div className="shadow-md p-6 rounded-lg bg-secondary text-foreground">
            <Form >
                <h1 className="text-xl font-bold mb-4">Add Employee</h1>
                {success && <p className="text-green-500 mb-4 text-center">{success}</p>}
                {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
                <label className="block mb-4">
                    Name
                    <Input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-foreground bg-background text-foreground" />
                </label>
                <label className="block mb-4">
                    Position
                    <Select onValueChange={(value) => handleSelectChange('position', value)}>
                        <SelectTrigger className="w-full border border-foreground bg-background text-foreground">
                            <SelectValue placeholder="Select Position" />
                        </SelectTrigger>
                        <SelectContent className="bg-background text-foreground">
                            <SelectGroup>
                                <SelectLabel>Positions</SelectLabel>
                                <SelectItem value="Manager">Manager</SelectItem>
                                <SelectItem value="Developer">Developer</SelectItem>
                                <SelectItem value="Designer">Designer</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </label>
                <label className="block mb-4">
                    Department
                    <Select onValueChange={(value) => handleSelectChange('department', value)}>
                        <SelectTrigger className="w-full border border-foreground bg-background text-foreground">
                            <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent className="bg-background text-foreground">
                            <SelectGroup>
                                <SelectLabel>Departments</SelectLabel>
                                <SelectItem value="HR">HR</SelectItem>
                                <SelectItem value="Engineering">Engineering</SelectItem>
                                <SelectItem value="Design">Design</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </label>
                <label className="block mb-4">
                    Salary
                    <Input type="number" name="salary" value={formData.salary} onChange={handleChange} className="mt-1 block w-full border border-foreground bg-background text-foreground" />
                </label>
                <Button type="submit" onClick={handleSubmit} className="mt-4 bg-primary text-primary-foreground">{loading ? 'Adding...' : 'Add Employee'}</Button>
            </Form>
        </div>
    );
};

export default Page;