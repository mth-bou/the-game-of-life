"use client";

import React from "react";
import "./../../public/app.css";

import { GridProvider} from "@/context/GridContext";
import App from "@/components/App";

const Page: React.FC = () => {
    return (
        <GridProvider>
            <App />
        </GridProvider>
    );
};

export default Page;
