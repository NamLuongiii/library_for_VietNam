"use client";

import dynamic from 'next/dynamic';
import React from 'react';

export default function Ereader() {
    const ReactReader = dynamic(
        () => import('react-reader').then((res) => res.ReactReader),
        { ssr: false }
    );

    const [location, setLocation] = React.useState(0)
    return (
        <div style={{ height: '100vh' }}>
            <ReactReader
                url="https://react-reader.metabits.no/files/alice.epub"
                location={location}
                locationChanged={epubcfi => setLocation(epubcfi)}
            />
        </div>
    )
}