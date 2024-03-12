'use client';

import { useRouter } from "next/navigation";
import Heading from "./Heading";
import Button from "./Button";


interface EmptyState {
    title?: string;
    subtitle?: string;
    showReset?:boolean
}
const EmptyState: React.FC<EmptyState> =({
    title= "No exact match",
    subtitle= "Try changing or memoving some of your filter",
    showReset
}) => {
    const router = useRouter();
    return (
        <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
            <Heading 
                center
                title={title}
                subtitle={subtitle}
            />
            <div className="mt-2 w-36">
                {showReset && (
                    <Button 
                        outline
                        label="Remove all filter"
                        onClick={() => router.push('/')}
                    />
                )}
            </div>
        </div>
    )
}
export default EmptyState