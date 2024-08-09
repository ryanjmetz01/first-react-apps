import {useState, useEffect } from 'react'

const useWindowSize = () => {
    const [windowSize, setWindowSize] = useState({
        width: undefined,
        height: undefined
    });


    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        }

        handleResize(); 

        // on a window resize 
        window.addEventListener("resize", handleResize())

        // clean up function 
        return () => window.removeEventListener("resize", handleResize()); 
    }, [])

    return windowSize;
}
export default useWindowSize;