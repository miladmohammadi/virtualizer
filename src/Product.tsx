import React, {FunctionComponent} from "react";

interface IProductProps {
    title?: string;
    oldPrice?: string;
    Price?: string;
    logo?: string;
}

// eslint-disable-next-line react/display-name
const Product: FunctionComponent<IProductProps> = React.memo(({
                                                                  title,
                                                                  oldPrice,
                                                                  Price,
                                                                  logo
                                                              }) => {
    return (<div className="w-full p-4 md:w-1/2 lg:w-1/4">
        <a className="relative block h-48 overflow-hidden rounded">
            <img alt="ecommerce" className="block h-full w-full object-cover object-center"
                 src="https://dummyimage.com/423x263"/>
        </a>
        <div className="mt-4">
            <h3 className="title-font mb-1 text-xs tracking-widest text-gray-500">CATEGORY</h3>
            <h2 className="title-font text-lg font-medium text-gray-900">{title}</h2>
            <p className="mt-1">{Price}</p>
        </div>
    </div>)
})
export {Product}
