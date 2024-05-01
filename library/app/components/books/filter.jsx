"use client"
import { Divider, Radio, RadioGroup, Stack, Checkbox, filter } from "@chakra-ui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

export default function Filter({ categories }) {
    const searchParams = useSearchParams()
    const urlSearchParams = new URLSearchParams(searchParams)
    const router = useRouter()
    const sortName = "order_by"
    const filterName = "category"

    const [defaultRadioValue, setDefaultRadioValue] = useState("")
    const [defaultCheckValues, setDefaultCheckValues] = useState([])

    useEffect(() => {
        const sortNameValue = urlSearchParams.get(sortName)
        setDefaultRadioValue(sortNameValue ? sortNameValue : "desc")
        
        const filterNameValues = urlSearchParams.getAll(filterName)
        setDefaultCheckValues(filterNameValues)
    }, [])

    function handleRadioChange(e) {
        urlSearchParams.set(sortName, e)
        router.push("?" + urlSearchParams.toString())
    }

    function handleCheckboxChange(e) {
        if (e.target.checked) {
            urlSearchParams.append(filterName, e.target.value)
            return router.push("?" + urlSearchParams.toString())
        }

        urlSearchParams.delete(filterName, e.target.value)
        return router.push("?" + urlSearchParams.toString())

    }

    if (!defaultRadioValue && !defaultCheckValues.length) return <></>

    return <div>
        <h2 className="text-lg text-teal-500 mb-4">Sắp xếp</h2>
        <RadioGroup
            defaultValue={defaultRadioValue} 
            name={sortName} 
            onChange={handleRadioChange} 
            colorScheme="teal"
            className="py-2 lg:py-4">
            <Stack direction="column" className="text-xs" gap={4}>
                <Radio value="desc">Mới lên đầu</Radio>
                <Radio value="asc">Cũ lên đầu</Radio>
            </Stack>
        </RadioGroup>

        <Divider></Divider>

        <h2 className="text-lg text-teal-500 my-4">Theo danh mục</h2>
        <Stack className="text-sm" gap={2}>
            {categories.map(cate => (
                <Checkbox
                    defaultChecked={defaultCheckValues.includes(cate.id + "")}
                    key={cate.id}
                    name={filterName}
                    onChange={handleCheckboxChange}
                    colorScheme="teal"
                    value={cate.id}>{cate.name}</Checkbox>
            ))}
        </Stack>
    </div>
}