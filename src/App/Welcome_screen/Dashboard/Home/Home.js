import React,{useState,useEffect} from 'react'

function Home(props) {

    const [abc,setAbc]=useState();
    useEffect(() => {
        setAbc(props.isAuthed)
    }, [props.isAuthed])
    setAbc(props.isAuthed)

    console.log(abc);
    return (
        <div>
            This is Home Screen
            {/* <h2>{props.trial}</h2> */}
        </div>
    )
}

export default Home;
