'use client';

import { SafeUser } from "@/app/types";
import Heading from "../Heading";
import { SafeListing } from "@/app/types";
import Image from "next/image";
import HeartButton from "../HeartButton";
interface ListingHeadProps {
   
    title: string;
    locationValue : string;
    imageScr: string;
    id: string;
    currentUser?: SafeUser | null;
}
const ListingHead: React.FC<ListingHeadProps> = ({

    title,
    locationValue,
    imageScr,
    id,
    currentUser
}) => {

    
    return (
        <>
            <Heading 
                title={title} 
                subtitle={locationValue}
            />
            <div className="w-full h-[100vh] bg-cover bottom-3 overflow-hidden rounded-xl relative ">
                <Image
                    alt = "Image"
                    src = {imageScr}
                    fill
                    className="object-cover w-full"
                />
                <div className="absolute top-4 right-4">
                    <HeartButton
                        listingId={id}
                        currentUser={currentUser}
                    />
                    
                </div>
            </div>
            
        </>
    );
}

export default ListingHead