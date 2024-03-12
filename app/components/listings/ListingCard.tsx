'use client';
import { SafeUser, SafeListing, SafeReservation } from "@/app/types";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import  { format } from 'date-fns';
import Image from "next/image";
import HeartButton from "../HeartButton";
import Button from "../Button";


interface ListingCardProps {
    data: SafeListing;
    reservation?: SafeReservation;
    onAction?: (id:string) => void;
    disabled?: boolean;
    actionLabel?: string;
    actionId?: string;
    currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
    data,
    reservation,
    onAction,
    disabled,
    actionLabel,
    actionId = "",
    currentUser
}) => {
    const router= useRouter();

    const handleCancel = useCallback(
        (e: React.MouseEvent<HTMLButtonElement>) =>{
            e.stopPropagation();

            if(disabled) {
                return;
            }

            onAction?.(actionId);
        }, [onAction, actionId, disabled]
    )

    const price= useMemo(() => {
        if(reservation) {
            return reservation.totalPrice;
        }

        return data.price
    }, [reservation, data.price]);

    const reservationDate = useMemo(() => {
        if(!reservation) {
            return null;
        }

        const start = new Date(reservation.startDate);
        const end = new Date(reservation.endDate);

        return `${format(start, 'PP')} - ${format(end, 'PP')}`
    }, [reservation])
    return(
     
        <div onClick={() => router.push(`/listings/${data.id}`)}
         className="col-span-1 cursor-pointer group">
            <div className="flex flex-col gap-2 w-full">
                <div className="aspect-square w-full relative overflow-hidden rounded-xl">
                    <Image 
                    fill
                    alt = "Listing"
                    src={data.imageScr}
                    className="object-cover h-full w-full group-hover:scale-110 transition"
                    />
                    <div className="absolute top-3 right-3">
                        <HeartButton 
                            listingId = {data.id}
                            currentUser = {currentUser}
                        />

                    </div>
                </div>
                <div className="font-semibold text-[20px]">
                    {data.locationValue}
                </div>
                <div className="font-light text-neutral-500 text-[15px]">
                    {reservationDate || data.category}
                </div>
                <div className="flex flex-row items-center gap-1">
                    <div className="font-semibold">
                        đ {price}
                    </div>
                    <div >
                        {!reservation && (
                            <div className="font-light">/ ngay</div>
                        )}
                    </div>
                    {onAction && actionLabel && (
                        <Button
                        disable = {disabled}
                        small
                        label={actionLabel}
                        onClick={handleCancel}
                        />
                    )}
                </div>
            </div>
         </div>
    )
}
export default ListingCard;