"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    ChevronsUpDownIcon,
    LogOutIcon,
    PlusIcon,
    SettingsIcon,
    UserIcon,
} from "lucide-react";
import { User } from "./types";
import LogoutButton from "../login-register/LogoutButton";
import { useRouter } from "next/navigation";
import ProfileDialog from "./ProfileDialog";
import { Dialog } from "radix-ui";
import { useState } from "react";

interface AvatarComponentProps {
    data: User;  // hoặc type phù hợp với user của bạn
    onLogout: () => void;
}

export default function AvatarComponent({ data, onLogout }: AvatarComponentProps) {


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1.5 rounded-full pr-2.5 pl-1"
                >
                    <Avatar className="border-background size-6 border">
                        <AvatarImage
                            src="https://i.pravatar.cc/150?img=1"
                            alt={data.user_name}
                        />
                        <AvatarFallback>TB</AvatarFallback>
                    </Avatar>
                    <span className="text-sm">{data.user_name}</span>
                    <ChevronsUpDownIcon
                        className="size-3.5 opacity-60"
                        aria-hidden="true"
                    />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="center" sideOffset={8}>
                <DropdownMenuGroup>
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                        <ProfileDialog data={data}/>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <SettingsIcon aria-hidden="true" />
                        <span>Settings</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <UserIcon aria-hidden="true" />
                        <span>Teams</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <PlusIcon aria-hidden="true" />
                        <span>Invite</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem variant="destructive" onClick={onLogout}>
                    <LogOutIcon aria-hidden="true" />
                    <span>Log out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}