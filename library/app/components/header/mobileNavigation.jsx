"use client"
import Image from "next/image"
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Button,
    IconButton,
} from '@chakra-ui/react'
import { useRef } from "react"
import { HamburgerIcon } from "@chakra-ui/icons"

export default function MobileNavigation() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()

    return (
        <div className="block md:hidden">
            <IconButton
                ref={btnRef}
                onClick={onOpen}
                variant='outline'
                colorScheme='teal'
                aria-label='Call Sage'
                fontSize='20px'
                icon={<HamburgerIcon/>}
            />
            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                    </DrawerBody>

                    <DrawerFooter>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    )
}