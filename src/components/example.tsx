import {useEffect, useState} from "react";

export type Room = {id: number, name: string};

export default function Test(props: {room: Room | null}) {
    const [a, setA] = useState<number>(1);

    useEffect(() => {
        console.log('coucou', props.room?.name, a)
        return () => {
            console.log('THIS IS THE END')
        }
    }, [props.room, a])

    return (
        <>
            VBalue rde a: {a}
            <button onClick={() => setA(2)}>update a</button>
        </>
    );
}