import React from "react";
import {Product} from "./Product";
import {Idata} from "./tools";


export default function ProductRow(props: { style?: React.CSSProperties, item: Idata }) {
    return <section className="body-font text-gray-600" style={props.style}>
        <div className="container mx-auto">
            <div className="-m-4 flex flex-wrap">
                {(!!props.item ? <><Product title={props.item.title + 1} oldPrice={"$21"}
                                            Price={"$21"}
                                            logo={"https://via.placeholder.com/150"}
                        />
                            <Product title={props.item.title + 2}
                                     oldPrice={"$21"}
                                     Price={"$21"}
                                     logo={"https://via.placeholder.com/150"}
                            />
                            <Product title={props.item.title + 3}
                                     oldPrice={"$21"}
                                     Price={"$21"}
                                     logo={"https://via.placeholder.com/150"}
                            />
                            <Product title={props.item.title + 4}
                                     oldPrice={"$21"}
                                     Price={"$21"}
                                     logo={"https://via.placeholder.com/150"}
                            /></> :
                        <div style={{marginTop: 10, marginBottom: 10}}>
                            <div className={"col-md-6 col-lg-4 col-xl-3"}>
                                <div style={{
                                    height: 250,
                                    width: 250,
                                    display: "block"
                                }}>Loading...
                                </div>
                            </div>
                            <div className={"col-md-6 col-lg-4 col-xl-3"}>
                                <div style={{
                                    height: 250,
                                    width: 250,
                                    display: "block"
                                }}>Loading...
                                </div>
                            </div>
                            <div className={"col-md-6 col-lg-4 col-xl-3"}>
                                <div style={{
                                    height: 250,
                                    width: 250,
                                    display: "block"
                                }}>Loading...
                                </div>
                            </div>
                            <div className={"col-md-6 col-lg-4 col-xl-3"}>
                                <div style={{
                                    height: 250,
                                    width: 250,
                                    display: "block"
                                }}>Loading...
                                </div>
                            </div>
                        </div>
                )}
            </div>
        </div>
    </section>
}
