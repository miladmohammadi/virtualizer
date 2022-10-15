import React from "react";
// @ts-ignore
import useSWRInfinite, {SWRInfiniteKeyLoader} from 'swr/infinite';

import {NextPage} from "next";
import TanDemo from "../src/TanDemo";


const tanstack: NextPage = () => {
    return(<TanDemo/>)
}
export default tanstack
