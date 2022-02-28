import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
import { Link } from "react-router-dom";

const UserProfile = () => {
    let { id } = useParams();
    const [data, setData] = useState(null)

    useEffect(() => {
        async function fetchSwapi() {
            try {
                let response = await fetch(`https://swapi.dev/api/people/${id}`)
                response = await response.json()
                console.log(response);
                setData(response)
            } catch (e) {
                console.error(e);
            }
        }
        fetchSwapi()
    }, [id])

    if (!data) return null;

    return (<>
        <div className="main bg-purple-600 grid place-items-center h-screen">
            <div className="card mx-auto rounded-2xl p-4 bg-white shadow-lg capitalize font-semibold w-80 relative">
                <div className="name text-xl text-center font-semibold border-b pb-3 mb-3 uppercase">{data.name}</div>
                <div className="flex justify-between items-center height"><span>height:</span>{data.height}</div>
                <div className="flex justify-between items-center mass"><span>mass:</span>{data.mass}</div>
                <div className="flex justify-between items-center hair_color"><span>hair_color:</span>{data.hair_color}</div>
                <div className="flex justify-between items-center skin_color"><span>skin_color:</span>{data.skin_color}</div>
                <div className="flex justify-between items-center eye_color"><span>eye_color:</span>{data.eye_color}</div>
                <div className="flex justify-between items-center birth_year"><span>birth_year:</span>{data.birth_year}</div>
                <div className="flex justify-between items-center gender"><span>gender:</span>{data.gender}</div>

                <Link to={"/"}>
                    <XIcon className="absolute top-0 right-0 w-16 p-5 cursor-pointer" />
                </Link>
            </div>
        </div>
    </>);
}

export default UserProfile;