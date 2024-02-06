import { useSidebarContext } from '@/context/SidebarContext'
import { SideItemProps } from '@/types'
import { SideItemList } from '@/utils/config'
import Image from 'next/image'
import React from 'react'

const SideItems = () => {
  const { handleClick, selectedNavItem } = useSidebarContext()
  const SideItem = ({ title, link, isDisabled, icon }: SideItemProps) => {
    const isSelectedItem = () => {
      return selectedNavItem === link
    }

    return (
      <div
        onClick={() => handleClick(link)}
        className={`px-4 py-2 text-base group/sideItem flex flex-row gap-2.5 cursor-pointer rounded-sm ${
          isDisabled ? 'text-[#D6D7D9]' : `hover:bg-pShadeThree`
        } ${isSelectedItem() && !isDisabled && `bg-pShadeThree`}`}
      >
        <Image
          src={`/images/${icon}.svg`}
          width={24}
          height={24}
          alt=""
          className={`${
            isSelectedItem() ? 'hidden' : 'flex group-hover/sideItem:hidden'
          }`}
        />
        <Image
          src={`/images/${icon}-black.svg`}
          width={24}
          height={24}
          alt=""
          className={`${
            isSelectedItem() ? 'flex' : 'hidden group-hover/sideItem:flex'
          }`}
        />
        <div className={`${isSelectedItem() ? `text-black` : 'text-sidebarItem group-hover/sideItem:text-black'}`}>
          {title}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      {SideItemList.map((sideItem, index) => (
        <SideItem {...sideItem} key={`nav-item-${index}`} />
      ))}
    </div>
  )
}

export default SideItems
