import React,{useState,useEffect} from 'react';
import {useLocation} from 'react-router-dom';

function Home(props) {

    const location = useLocation();

    const [abc,setAbc]=useState();
    useEffect(() => {
        setAbc(location.state)
    }, [location.state])
    console.log(abc);

    console.log(abc);
    return (
        <div>
            This is Home Screen
        </div>
    )
}

export default Home;
