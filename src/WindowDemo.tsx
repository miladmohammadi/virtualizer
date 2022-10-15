import React, {FunctionComponent, useEffect, useState} from "react";
// @ts-ignore
import useSWRInfinite, {SWRInfiniteKeyLoader} from 'swr/infinite'
import {FixedSizeList as List} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import ProductRow from "../src/ProductRow";
import {fetcher, hw, Idata, PAGE_SIZE} from "../src/tools";

const NoSSr: FunctionComponent<{ children: React.ReactNode }> = ({children}) => {
    const [client, setClient] = useState<boolean>(false)
    useEffect(() => {
        setClient(true)
    }, [])
    return <>{client ? children : null}</>
}

const WindowDemo: React.FC = () => {

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
            <NoSSr>
                {isEmpty ? <p>No Data.</p> : null}
                <InfiniteLoader
                    isItemLoaded={(index) => !isLoadingMore && issues.length < index}
                    itemCount={issues.length}
                    loadMoreItems={(startIndex, stopIndex) => {
                        (!isLoadingInitialData) && stopIndex + 1 >= issues.length && setSize(size => size + 1)
                    }}
                >
                    {({onItemsRendered, ref}) => (
                        <List
                            itemCount={issues.length}
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                            height={hw().height}
                            width={hw().width}
                            itemSize={320}
                        >
                            {({index, isScrolling, style}) => {
                                const item = issues[index]
                                return (
                                    <ProductRow key={item?.id} style={style} item={item}/>
                                )
                            }}
                        </List>
                    )}
                </InfiniteLoader>
            </NoSSr>
        </div>)
}
export {WindowDemo}
