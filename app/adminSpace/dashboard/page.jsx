import { Card, CardHeader, CardTitle, CardDescription, CardFooter, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuCheckboxItem } from '@/components/ui/dropdown-menu';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ListFilter, File } from 'lucide-react';
import React from 'react';
import Link from 'next/link';

const getEmployees = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/employees', { cache: 'no-store' });
    const data = await response.json();
    return { employees: data };
  } catch (error) {
    console.error(error);
    return { employees: [] };
  }
};

const Homepage = async () => {
  const { employees } = await getEmployees();
  return (
    <div className="min-h-screen flex flex-col w-full">
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Employees</CardTitle>
            <CardDescription>Here are the employees in your company</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map((employee) => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.email}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter>
            <Button><Link href={'/adminSpace/employees'}>View all employees</Link></Button>
          </CardFooter>
        </Card>
      </div>
    </div>

  );
};

export default Homepage;
