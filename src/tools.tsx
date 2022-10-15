import {SWRInfiniteConfiguration} from "swr/infinite";
import {BareFetcher} from "swr";

export interface Idata {
    id: number,
    title: string,
}

export const mockdata = (page: number, PAGE_SIZE: number): Idata[] => {
    const arr = new Array(PAGE_SIZE).fill(1)
    return arr.map((e, i) => {
        return {id: (i * page), title: 'product' + i * page}
    })
}
export const myPromise = (page: number, PAGE_SIZE: number) => Promise.resolve(mockdata(page, PAGE_SIZE))

export const fetcher = (index:number): Promise<Idata[]> => {
    console.log(`page ${index} is called.`)
    return myPromise(index, 20)
}

export const PAGE_SIZE = 20;

export const hw = () => {
    if (typeof window != "undefined") { // needed if SSR
        return {
            height: window.innerHeight,
            width: window.innerWidth
        }
    } else {
        return {height: 700, width: 1100}
    }
}


