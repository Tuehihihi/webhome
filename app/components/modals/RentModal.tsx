'use client';
import useRentModal from "@/app/hooks/useRentModal";
import Modal from "./Modal";
import Heading from "../Heading";
import { useMemo, useState } from "react";
import CategoryInput from "../inputs/CategoryInput";
import { categories } from "../navbar/Categories";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import CountrySelect from "../inputs/CountrySelect";
import Counter from "../inputs/Counter";
import ImageUpload from "../inputs/ImageUpload";
import Input from "../inputs/Input";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES =3,
    DESCRIPTION = 4,
    PRICE = 5,
}
const RentModal = () => {
    const router = useRouter();
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    }=useForm<FieldValues>({
        defaultValues: {
            category : '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageScr: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageScr = watch('imageScr');
    const setCustomValue = (id: string, value: any) => {
        setValue(id,value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true,
         
        })
    }

    const onBack = () => {
        setStep((value) => value - 1);
    };
    const onNext = () =>{
        setStep((value) => value + 1);
    };
    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);
        axios.post ('/api/listings', data)
        .then(() => {
            toast.success('Listing Crated!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose()
        })
        .catch(() =>{
            toast.error('Something wrong');
        }).finally(() =>{
            setIsLoading(false);
        })
    }
    const actionLable = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Create'
        }
        return 'Next'
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY){
            return undefined
        }
        return 'Back'
    }, [step]);

    let bodyContent = (
        <div className="flex flex-col gap-6">
            <Heading 
                title = "Which of these best describe your place?"
                subtitle = "Pick a category"
            />
            <div className="grid grid-cols1 md:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto">
                {categories.map((item) => (
                    <div key={item.label} className="col-span-1">
                        <CategoryInput 
                        onClick={(category) => setCustomValue('category', category)}
                        selected = {category ===item.label}
                        label = {item.label}
                        icon = {item.icon}
                        />
                    </div>

                ))}
            </div>
        </div>
    )

    if(step ===STEPS.LOCATION){
        bodyContent = (
            <div className="flex flex-col gap-7">
            <Heading 
                title="Where is the place located?"
                subtitle="Help guests find you!"
            />
            <CountrySelect value={location}
            onChange={(value) => setCustomValue('location', value)} />
            </div>
        )
    }
    if(step === STEPS.INFO){
        bodyContent = (
            <div className=" flex flex-col gap-7">
                <Heading
                    title="Share some basics about your place"
                    subtitle="What amenities do you have"
                />
                <Counter
                 title="Guest"
                 subtitle="How many guests do you allow?"
                 value={guestCount}
                 onChange={(value) => setCustomValue('guestCount', value)}
                />
                <Counter
                 title="Rooms"
                 subtitle="How many rooms do you have?"
                 value={roomCount}
                 onChange={(value) => setCustomValue('roomCount', value)}
                />
                <Counter
                 title="Guest"
                 subtitle="How many bathroom do you have?"
                 value={bathroomCount}
                 onChange={(value) => setCustomValue('bathroomCount', value)}
                />


            </div>
        )
    }

    if(step === STEPS.IMAGES){
        bodyContent = (
         <div className="flex flex-col gap-7">
            <Heading 
                title="Add a Photo of your place"
                subtitle="Show guests what your place look like"
            />
            <ImageUpload 
                value={imageScr}
                onChange={(value) => setCustomValue('imageScr', value)}
            />
         </div>
        )
    }
    if(step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className=" flex flex-col gap-7">
                <Heading 
                    title="How do you describe your place? "
                    subtitle="Short and sweet works best"
                />
                <Input
                    id= "title"
                    label="Title"
                    disabled= {isLoading}
                    register={register}
                    errors={errors}
                    required
                />
                <hr />
                <Input
                    id= "description"
                    label="Description"
                    disabled= {isLoading}
                    register={register}
                    errors={errors}
                    required
                />
            </div>
        )
    }
    if(step === STEPS.PRICE){
        bodyContent = (
            <div className="flex flex-col gap-7">
                <Heading 
                    title="Now,set your price"
                    subtitle="How much do you charge per night?"
                />
                <Input 
                id="price"
                label="Price"
                formatPrice 
                type="number"
                disabled= {isLoading}
                register={register}
                errors={errors}
                required
                />
            </div>
        )
    }
    return( 
        <Modal 
        isOpen= {rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLable={actionLable}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={ step === STEPS.CATEGORY ? undefined : onBack}
         title="Airbnb your home!"
         body={bodyContent}
        />
    );
}
export default RentModal;