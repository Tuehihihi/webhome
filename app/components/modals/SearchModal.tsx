'use client';
import qs from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useCallback, useMemo, useState } from "react";
import { DateRange, Range } from "react-date-range";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import Calendar from "../inputs/Calendar";
import Counter from "../inputs/Counter";

enum STEPS {
    LOCATION = 0,
    DATE = 1,
    INFO = 2,
}
const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const [location, setLocation] = useState<CountrySelectValue>()

    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathRoomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key : 'selection'
    });

    const onBack = useCallback(() => {
        setStep((value) => value - 1);
    }, []);

    const onNext = useCallback(() =>{
        setStep((value) => value + 1)
    }, []);

    const onSubmit = useCallback(async () => {
        if(step !==STEPS.INFO){
            return onNext();
        }

        let currentQuery = {};

        if(params) {
            currentQuery =qs.parse(params.toString())
        }

        const updateQuery: any = {
            ... currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        };

        if(dateRange.startDate) {
            updateQuery.startDate = formatISO(dateRange.startDate);
        }

        if(dateRange.endDate) {
            updateQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updateQuery
        }, {skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    },[ step,searchModal,location,router,guestCount,roomCount,bathroomCount,dateRange,onNext,params]);

    const actionLabel = useMemo(() => {
        if(step === STEPS.INFO) {
            return 'Search';
        }

        return 'Next';
    },[step]);
    
    const secondaryActionLabel = useMemo(() => {
        if(step ===STEPS.LOCATION){
            return undefined;
        }

        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-6" >
            <Heading 
                title="Where you wanns go"
                subtitle="Find the perfect location"
            />
            <CountrySelect 
                value={location}
                onChange={(value)=>
                setLocation(value as CountrySelectValue) 
                }
            />
        </div>
    )

    if(step === STEPS.DATE){
        bodyContent = (
         <div className="flex flex-col gap-6">
            <Heading 
                title="When do you plan to go"
                subtitle="Make sure everyone free"
            />
            <Calendar 
                value={dateRange}
                onChange={(value) => setDateRange(value.selection)}
            />
         </div>
        )
    }

    if(step === STEPS.INFO) {
        bodyContent = (
            <div className="flex flex-col gap-6">
                <Heading 
                    title="More info"
                    subtitle="find your perfect place"
                />
                <Counter 
                title="Guests"
                subtitle="How  many guest"
                value={guestCount}
                onChange={(value) => setGuestCount(value)}
                />
                 <Counter 
                title="Rooms"
                subtitle="How  many rooms"
                value={roomCount}
                onChange={(value) => setRoomCount(value)}
                />
                 <Counter 
                title="Bathroom"
                subtitle="How  many bathrooms"
                value={bathroomCount}
                onChange={(value) => setBathRoomCount(value)}
                />
            </div>
        )
    }
    return(
        <Modal 
            isOpen = {searchModal.isOpen}
            onClose= {searchModal.onClose}
            onSubmit={onSubmit}
            title="Filters"
            actionLable={actionLabel}
            secondaryActionLabel={secondaryActionLabel}
            secondaryAction={step === STEPS.LOCATION ? undefined: onBack}
            body={bodyContent}
        />
    );
}



export default SearchModal