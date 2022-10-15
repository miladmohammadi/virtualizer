import React, {useEffect} from "react";
// @ts-ignore
import useSWRInfinite, {SWRInfiniteKeyLoader} from 'swr/infinite';
import {useVirtualizer} from "@tanstack/react-virtual";
import ProductRow from "../src/ProductRow";
import {fetcher, Idata, PAGE_SIZE} from "../src/tools";

const extracted = (index: number, previousPageData?: any) => index + 1;


const TanDemo: React.FC = () => {

    const {data, error, mutate, size, setSize, isValidating} = useSWRInfinite<Idata[]>(
        // @ts-ignore
        extracted,
        fetcher
    );

    const parentRef = React.useRef()

    const issues: Idata[] = data ? ([] as Idata[]).concat(...data) : [] as [];
    const isLoadingInitialData = !data && !error;
    const isLoadingMore =
        isLoadingInitialData ||
        (size > 0 && data && typeof data[size - 1] === "undefined");
    const isEmpty = data?.[0]?.length === 0;
    const isReachingEnd =
        isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE);
    const isRefreshing = isValidating && data && data.length === size;

    const rowVirtualizer = useVirtualizer({
        count: issues.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 320,
        overscan: 5,
    })

    useEffect(() => {
        const [lastItem] = [...rowVirtualizer.getVirtualItems()].reverse()

        if (!lastItem) {
            return
        }

        if (
            lastItem.index >= issues.length - 1 &&
            !isReachingEnd &&
            !isLoadingMore
        ) {
            setSize(prev => prev + 1)
        }
    }, [
        isReachingEnd,
        size,
        issues.length,
        isLoadingMore,
        setSize,
        rowVirtualizer
    ])

    return (
        <div>
            {isEmpty ? <p>Yay, no issues found.</p> : null}
            <div
                ref={parentRef}
                className="List"
                style={{
                    height: `100vh`,
                    width: `100%`,
                    overflow: 'auto',
                }}
            >
                <div
                    style={{
                        height: `${rowVirtualizer.getTotalSize()}px`,
                        width: '100%',
                        position: 'relative',
                    }}
                >
                    {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                        const isLoaderRow = virtualRow.index > issues.length - 1
                        const post = issues[virtualRow.index]

                        return (
                            <div
                                key={virtualRow.index}
                                className={
                                    virtualRow.index % 2 ? 'ListItemOdd' : 'ListItemEven'
                                }
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    width: '100%',
                                    height: `${virtualRow.size}px`,
                                    transform: `translateY(${virtualRow.start}px)`,
                                }}
                            >
                                {isLoaderRow
                                    ? !isReachingEnd
                                        ? 'Loading more...'
                                        : 'Nothing more to load'
                                    : <ProductRow item={post}/>}
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                {isLoadingInitialData && isLoadingMore ? 'Background Updating...' : null}
            </div>
        </div>
    );
}
export default TanDemo
