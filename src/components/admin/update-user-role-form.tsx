
'use client';

import { useState } from "react";
import { User } from "@/lib/data";
import { DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface UpdateUserRoleFormProps {
    user: User;
    onRoleUpdate: (userId: string, newRole: User['role']) => void;
}

const roles: User['role'][] = ['Admin', 'Customer'];

export function UpdateUserRoleForm({ user, onRoleUpdate }: UpdateUserRoleFormProps) {
    const [selectedRole, setSelectedRole] = useState<User['role']>(user.role);
    
    const handleSubmit = () => {
        onRoleUpdate(user.id, selectedRole);
    }

    return (
        <>
            <DialogHeader>
                <DialogTitle>Update User Role</DialogTitle>
                <DialogDescription>
                    Change the role for {user.name}.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div className="space-y-2">
                    <Label htmlFor="role">User Role</Label>
                    <Select value={selectedRole} onValueChange={(value: User['role']) => setSelectedRole(value)}>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                            {roles.map(role => (
                                <SelectItem key={role} value={role}>
                                    {role}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <Button onClick={handleSubmit}>Update Role</Button>
            </DialogFooter>
        </>
    )
}
