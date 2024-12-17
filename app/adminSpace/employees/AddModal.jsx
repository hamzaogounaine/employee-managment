import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"
import { useEffect, useState } from "react"

const getEmployeeInfo = async (id) => {
    const baseUrl = 'http://localhost:3000'; // Adjust for your environment
    const response = await fetch(`${baseUrl}/api/employees/${id}`);
    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch employee details');
    }

    return data;
}

export function AddDialog({ id, setIsOpen }) {
    const [formData, setFormData] = useState({
        employeeId: '',
        username: '',
        password: '',
    })
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [alreadyExists, setAlreadyExists] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getEmployeeInfo(id);
            setFormData({
                username: data.name,
                employeeId: data._id
            });
        }
        fetchData()

    }, [id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        try {
            const users = await fetch('http://localhost:3000/api/employeeRegister', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            );
            const data = await users.json();
            if (data.find(user => user.username === formData.username)) {
                setAlreadyExists(true);
                setLoading(false);
                return;
            }
        } catch (error) {
            setError('Failed to create user');
            return

        }
        finally {
            setLoading(false);
        }
        try {

            const response = await fetch('http://localhost:3000/api/employeeRegister', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                const data = await response.json();
                setError(data.message);
                return;
            }
            setSuccess('User created successfully');
        } catch (error) {
            setError('Failed to create user');

        } finally {
            setLoading(false);
            setTimeout(() => {
                setSuccess('');
                setError('');
            }, 3000)
        }
    }
    return (
        <form onSubmit={handleSubmit} className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-70 '>

            <div className="grid gap-4 bg-background border  rounded-lg py-5 px-5 relative">
                <div className=" mb-4 flex flex-col gap-2">
                    <div className="absolute right-5 top-5">
                        <X onClick={() => setIsOpen(false)} className="w-4 h-4 cursor-pointer hover:text-foreground text-secondary" />
                    </div>
                    <h1 className="text-lg font-bold ">Add login</h1>
                    <p className="text-gray-500  text-sm">Make changes to your profile here. Click save when you're done.</p>
                    {alreadyExists && <p className="text-red-500 text-sm text-center">Login already exists</p>}
                    {success && <p className="text-green-500 text-sm text-center">{success}</p>}
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                </div>
                <div className={` ${alreadyExists ? 'hidden' : 'flex flex-col gap-4'}`}>

                    <div className={`grid grid-cols-4 items-center gap-4`}>
                        <Label htmlFor="username" className="text-right ">
                            username
                        </Label>
                        <Input id="username" name='username' disabled={!formData.username} value={formData.username.replace(' ', '')} onChange={handleChange} className="col-span-3 border border-foreground" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right ">
                            Password
                        </Label>
                        <Input type='password' id="password" placeholder='**********' name='password' value={formData.password} onChange={handleChange} className="col-span-3 border border-foreground" />
                    </div>
                    <div className="flex justify-end w-full">
                        <Button type='submit' disabled={loading} className="mt-4 bg-primary text-primary-foreground float-right " >{loading ? 'Adding' : 'Add Login'}</Button>
                    </div>
                </div>

            </div>

        </form>
    )
}
