import { useEffect, useState } from "react";

const useProperties = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/property')
            .then(res => res.json())
            .then(data => {
                setData(data);
                console.log(data);
            });
    }, []);
    return [data]
};

export default useProperties;