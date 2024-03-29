'use client'

import { SafeUser } from "@/app/types";
import { IconType } from "react-icons";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
interface ListingInfoProps {
    user: SafeUser;
    description: string;
    guestCount: number;
    roomCount: number;
    bathroomCount: number
    category: {
        icon: IconType;
        label: string;
        description: string;
    } | undefined
    locationValue : string;
}

const ListingInfo: React.FC<ListingInfoProps> = ({
    user,
    description,
    guestCount,
    roomCount,
    bathroomCount,
    category,
    locationValue
}) => {
    
    return(
        <div className=" col-span-4 flex flex-col gap-3 ">
            <div className="flex flex-col gap-1">
                <div className="text-xl font-semibold flex flex-row items-center gap-1">
                    <div>Host by {user?.name}</div>
                </div>
                <Avatar 
                    src={user?.image}
                />
            </div>
            <div className="flex flex-row items-center gap-2 font-light text-neutral-500">
                <div>
                    {guestCount} guests
                </div>
                <div>
                    {roomCount} rooms
                </div>
                <div>
                    {bathroomCount} bathrooms
                </div>
            </div>
            <hr />
            {category &&(
                <ListingCategory 
                    icon= {category.icon}
                    label = {category.label}
                    description = {category.description}
                />
            )}
            <hr />
            <div className="text-lg font-light text-neutral-500">
                {description}
            </div>
            <hr />
            
        </div>
    );
}
export default ListingInfo