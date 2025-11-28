
'use client';

import { User } from "@/lib/data";
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "../ui/badge";

interface UserDetailsProps {
    user: User;
}

export function UserDetails({ user }: UserDetailsProps) {
    const roleVariant: "default" | "secondary" = user.role === "Admin" ? "default" : "secondary";

    return (
        <>
            <DialogHeader>
                <DialogTitle>{user.name}</DialogTitle>
                <DialogDescription>
                    User since {user.memberSince}.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
                <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Role</h3>
                    <Badge variant={roleVariant}>{user.role}</Badge>
                </div>
            </div>
        </>
    )
}
