"use client"
import { useState } from "react";
import {ProductsContainer} from "../../components/ProductsContainer/ProductsContainer";
import {ProductsFilterContainer}  from "../../components/ProductsFilterContainer/ProductsFilterContainer";


export default function Home() {
    const [filterCategory, setFilterCategory] = useState({});
    const [filterParams, setFilterParams] = useState({});

    return (
        <div className="w-full flex">
            <div className="w-1/4">
                <ProductsFilterContainer
                    setFilterCategory={setFilterCategory}
                    setFilterParams={setFilterParams}
                />
            </div>
            <div className="w-3/4 ">
                <ProductsContainer
                    filterParams={filterParams}
                    filterCategory={filterCategory}
                />
            </div>
        </div>
    );
}
