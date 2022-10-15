import React from "react";
// @ts-ignore
import useSWRInfinite, {SWRInfiniteKeyLoader} from 'swr/infinite'
import {Virtuoso} from "react-virtuoso";
import {fetcher, Idata, PAGE_SIZE} from "../src/tools";
import ProductRow from "../src/ProductRow";

const VirtuDemo: React.FC = () => {

    const {data, error, mutate, size, setSize, isValidating} = useSWRInfinite<Idata[]>(
        // @ts-ignore
        (index: number, previousPageData: any) => {
            return index + 1
        },
        fetcher
    );

    const issues: Idata[] = data ? ([] as Idata[]).concat(...data) : [] as [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
    const isRefreshing = isValidating && data && data.length === size;

    return (
        <div>
            {isEmpty ? <p>Yay, no issues found.</p> : null}
            <Virtuoso
                style={{height:"100vh"}}
                data={issues}
                isScrolling={() => {
                }}
                endReached={() => setSize(prev => prev + 1)}
                itemContent={(index, item) => {
                    return (
                        <ProductRow key={item?.id} item={item}/>
                    )
                }}
            />
        </div>
    );
}
export default VirtuDemo
