import React from 'react';
import {Sunrise, Sunset, X} from "lucide-react";
import axios from "axios";
import {SERVER_URL} from "../Consts";
import {useCookies} from "react-cookie";

const CoordinateModal = ({coordinate, closeModal, deleteSuccess}) => {
    const [cookies] = useCookies(['userId'])
    const deleteHandler = async () => {
        if (cookies.userId) {
            const res = await axios.delete(`${SERVER_URL}/users/delete-coordinates?userId=${cookies.userId}&coordinatesId=${coordinate.id}`, {})
            if (res.status > 300) {
                alert("Could not delete coordinates.");
            } else {
                deleteSuccess()
                closeModal()
            }
        }
    }
    return (
        <div className="h-dvh w-dvw  fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center"
             style={{background: 'rgba(0,0,0,.75)'}}>
            <div className={'bg-white p-4 rounded-3xl relative'} style={{width: '60%', height: '70%'}}>
                <div className={'text-2xl mb-2'}>{coordinate.country.name}, {coordinate.city}</div>
                <div className={'mb-2'}>{coordinate.date}</div>
                <div className={'mb-5'}>Timezone:{coordinate.timeZone}</div>
                <div className={'flex justify-around mb-5'}>
                    <div className={'flex flex-col items-center text-xl'}><Sunrise color={'#FFE994'} size={'160'}/>
                        Sunrise <span className={'font-extrabold'}
                                      style={{color: '#FFE994'}}>{coordinate.sunrise}</span>
                    </div>
                    <div className={'flex flex-col items-center text-xl'}><Sunset color={'#FF5638'} size={'160'}/>
                        Sunset <span className={'font-extrabold'} style={{color: '#FF5638'}}>{coordinate.sunset}</span>
                    </div>
                </div>
                <div style={{fontSize: 20}}>Latitude: {coordinate.latitude}</div>
                <div style={{fontSize: 20}}>Longitude: {coordinate.longitude}</div>
                <button onClick={deleteHandler} className={'px-12 py-3 bg-red-500 rounded-2xl shadow-md mt-16 block mx-auto'}>Delete</button>
                <div className={'absolute top-5 right-5'} onClick={closeModal}>
                    <button><X size={36}/></button>
                </div>
            </div>
        </div>
    );
};

export default CoordinateModal;