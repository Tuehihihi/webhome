'use client';

import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import Container  from "../Container";
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from "react-icons/gi";
import { MdOutlineVilla } from "react-icons/md";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description: 'This properties is close to the beach'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description: 'This properties has windmill'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description: 'This properties is modern'
    },
    {
      label: 'Counryside',
      icon: TbMountain,
      description: 'This properties is in countryside'
  },
  {
    label: 'Pools',
    icon: TbPool,
    description: 'This properties has a pool'
  },
  {
    label: 'Island',
    icon: GiIsland,
    description: 'This properties is on island'
  },
  {
    label: 'Lake',
    icon: GiBoatFishing,
    description: 'This properties is close to a lake'
  },
  {
    label: 'Skiing',
    icon: FaSkiing,
    description: 'This properties has skiing activities'
  },
  {
    label: 'Castle',
    icon: GiCastle,
    description: 'This properties is a castle'
  },
  {
    label: 'Camping',
    icon: GiForestCamp,
    description: 'This properties has camping activities'
  },
  {
    label: 'Arctic',
    icon: BsSnow,
    description: 'This properties has snow'
  },
  {
    label: 'Cave',
    icon: GiCaveEntrance,
    description: 'This properties in a cave'
  },
  {
    label: 'Desert',
    icon: GiCactus,
    description: 'This properties is in desert'
  },
  {
    label: 'Barns',
    icon: GiBarn,
    description: 'This properties is in the barn'
  },
  {
    label: 'Lux',
    icon: IoDiamond,
    description: 'This properties is luxury'
  },
]

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();

  const isMainPage = pathname === '/';

  if(!isMainPage){
    return null;
  }
    return (
      <Container>
        <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
           {categories.map((item)=> (
            <CategoryBox
                key = {item.label}
                label = {item.label}
                selected = {category === item.label}
                icon = {item.icon}
                />
           ))}
        </div>
      </Container>
    );
}
export default Categories;