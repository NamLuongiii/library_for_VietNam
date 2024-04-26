"use client"
import { ArrowUpIcon } from "@chakra-ui/icons"
import ExtScrollToTop from "react-scroll-to-top"

export default function ScrollToTop() {

    return <ExtScrollToTop 
                smooth 
                color="#6f00ff" 
                component={<ArrowUpIcon boxSize={8}></ArrowUpIcon>}
                className="flex justify-center items-center !bg-teal-500 !text-white !p-2" >
            </ExtScrollToTop>

}