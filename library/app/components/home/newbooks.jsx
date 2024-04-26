"use client"

import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons"
import Cover from "../commons/cover"
import { IconButton } from "@chakra-ui/react"

export default function BookDiscovery({ booksDiscovery }) {

  const sliderLeft = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft -= 500; // Di chuyển sang trái
  };
  
  const sliderRight = () => {
    const slider = document.getElementById("slider");
    slider.scrollLeft += 500; // Di chuyển sang phải
  };

  return (
    <div className="pt-16">
      <h2 className="text-2xl font-bold text-gray-600 mb-8">Khám phá sách</h2>
      <div className="relative flex items-center gap-2">
        <IconButton
          onClick={sliderLeft}
          isRound={true}
          variant='solid'
          colorScheme='teal'
          aria-label='Done'
          fontSize='40px'
          icon={<ChevronLeftIcon />}
        />
        <div id="slider" className="w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide flex flex-nowrap gap-4">
          {booksDiscovery.map(book => (
            <Cover key={book.id} book={book}></Cover>
          ))}
        </div>
        <IconButton
          onClick={sliderRight}
          isRound={true}
          variant='solid'
          colorScheme='teal'
          aria-label='Done'
          fontSize='40px'
          icon={<ChevronRightIcon />}
        />
      </div>
    </div>
  )
}