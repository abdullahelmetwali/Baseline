"use client";
import { useState, useEffect } from 'react';

const IsTabletOrLarger = () => {
    const query = "(max-width: 1025px)";
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        // Check if `window` is available (only in the browser)
        if (typeof window !== 'undefined') {
            const mediaQueryList = window.matchMedia(query);

            const handleChange = (event) => {
                setMatches(event.matches);
            };

            setMatches(mediaQueryList.matches);

            mediaQueryList.addEventListener('change', handleChange);

            return () => {
                mediaQueryList.removeEventListener('change', handleChange);
            };
        }
    }, [query]);

    return matches;
};

export default IsTabletOrLarger;
