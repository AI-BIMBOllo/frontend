import React from "react";
import Head from "next/head";
import styles from "./User.module.css";
import MapComponent from "@/components/MapComponent/MapComponent";
import { CustomWebcam } from "@/components/CustomWebcam";

export default function UserPage() {
    return(
        <div>
            <Head>
                <title>Usuario</title>
            </Head>
            <h1>Toma la foto</h1>
            <CustomWebcam />

        </div>
    );
}