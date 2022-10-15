import React from "react";
// @ts-ignore
import useSWRInfinite, {SWRInfiniteKeyLoader} from 'swr/infinite'
import {NextPage} from "next";
import VirtuDemo from "../src/VirtuDemo";

const virtuosu: NextPage = () => {
    return (<VirtuDemo/>)
}
export default virtuosu
