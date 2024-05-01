import { Input } from '@chakra-ui/react'

export default function Search() {

    return (
        <form action='/books'>
            <Input id="search" name='key_word' placeholder='Search ...'></Input>
        </form>
    )
}