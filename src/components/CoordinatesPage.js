import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {SERVER_URL} from "../Consts";
import {useCookies} from "react-cookie";
import {Sunrise, Sunset} from "lucide-react";
import CoordinateModal from "./CoordinateModal";
import {useNavigate} from "react-router-dom";
import {LoaderIcon} from 'lucide-react'

const CoordinatesPage = () => {
    const [coordinatesList, setCoordinatesList] = useState([]);
    const [currentCountry, setCurrentCountry] = useState({});
    const [chosenCountry, setChosenCountry] = useState({});
    const [loading, setLoading] = useState(false);
    const [isModal, setIsModal] = useState(false);
    const [formData, setFormData] = useState({
        latitude: 0,
        longitude: 0,
        date: ''
    });
    const [cookies, setCookie, removeCookie] = useCookies(['userId'])
    const navigate = useNavigate();
    const CoordinatesClickHandler = (coordinate) => {
        setChosenCountry(coordinate)
        setIsModal(prevState => !prevState)
    }
    const logoutHandler = () => {
        removeCookie('userId', {path: '/'})
        navigate('/login')
    }
    const deleteSuccess = () => {
        setCoordinatesList(prevState => prevState.filter(item => item.id !== chosenCountry.id))
    }
    const handleInputChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };
    const closeModal = () => {
        setIsModal(false)
    }
    useEffect( ()=> {
            if (!cookies.userId) {
              navigate('/login');
            }
    }, [cookies.userId])
    useEffect( ()=> {
        async function handleSubmit() {
            if (cookies.userId) {

                const res = await axios.get(`${SERVER_URL}/users/get-coordinates/${cookies.userId}?pageNumber=0&pageSize=10`, {})
                if (res.status < 300) {
                    setCoordinatesList(res.data.content)

                }
            }
        }
        handleSubmit()
    }, [cookies.userId, currentCountry])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true)
            const res = await axios.get(`${SERVER_URL}/coordinates/get-info/${cookies.userId}?latitude=${formData.latitude}&longitude=${formData.longitude}&date=${formData.date}`);
            console.log(res)
            setCurrentCountry(res.data)
            // setFormData({
            //     latitude: 0,
            //     longitude: 0,
            //     date: ''
            // });
        } catch (error) {
            console.error('Error creating coordinates:', error);

        } finally {
            setLoading(false)
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr' }}>
            <div className={'relative'}>
                <button onClick={logoutHandler} className={'absolute top-5 right-5 bg-blue-300 rounded-2xl px-4 py-2'}>Log Out</button>
                <form onSubmit={handleSubmit} className={'border-2 rounded-2xl border-blue-300 m-6 py-3 px-16 inline-flex flex-col'}>
                    <div className='flex mb-4 items-center'>
                        <label className={'mr-3'}>
                            Latitude:
                        </label>
                        <input
                            type="number"
                            name="latitude"
                            value={formData.latitude}
                            onChange={handleInputChange}
                            className="border-2 border-blue-300 max-w-64 w-full rounded-2xl p-2"
                        />
                    </div>
                    <div className='flex mb-4 items-center '>
                        <label className={'mr-3'}>
                            Longitude:
                        </label>
                        <input
                            type="number"
                            name="longitude"
                            value={formData.longitude}
                            onChange={handleInputChange}
                            className="border-2 border-blue-300 max-w-64 w-full rounded-2xl p-2"
                        />
                    </div>
                    <div className='flex mb-4 items-center'>
                        <label className={'mr-3'}>
                            Date:
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="border-2 border-blue-300 max-w-32 w-full rounded-2xl p-2"
                        />
                    </div>
                    <button className={'max-w-64 ml-6 border-none shadow-md bg-blue-300 px-6 py-3 rounded-2xl'} type="submit">Get info</button>
                </form>
                {loading && <LoaderIcon color={'#000000'} size={'52'} className={'animate-spin text-white mx-auto my-5'}/> }
                {currentCountry.country && <div>
                    <h1 className={'text-center text-2xl mb-8'}>Sunrise and sunset times in {currentCountry.country}, {currentCountry.city}
                    </h1>
                    <div className={'flex justify-between mx-auto'} style={{width:'60%'}}>
                        <div className={'flex flex-col items-center text-xl'}><Sunrise color={'#FFE994'} size={'160'}/>{currentCountry.sunrise}</div>
                        <div className={'flex flex-col items-center text-xl'}><Sunset color={'#FF5638'} size={'160'}/>{currentCountry.sunset}</div>
                    </div>
                </div>}
            </div>
            <div>
                <ul className={'bg-blue-100 border-l-2 border-gray-400 h-dvh overflow-y-scroll'}>
                    {coordinatesList.length === 0 ? <div className={'p-5'}>No coordinates</div>: coordinatesList.map((coordinate, index) => (
                        <li key={index} className={' cursor-pointer p-4 border-b-2 border-gray-400'} onClick={() => CoordinatesClickHandler(coordinate)}>
                            <div className={'text-xl mb-2 '}>Country: {coordinate.country.name}, City: {coordinate.city}</div>
                            <div className={'flex'}>
                                <span className={'flex mr-2 text-gray-700'}><Sunrise color={'#FCFF27'}/>{coordinate.sunrise}</span>
                                <span className={'flex text-gray-700'}><Sunset color={'#FF5638'}/>{coordinate.sunset}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {(isModal && chosenCountry.country) && <CoordinateModal coordinate={chosenCountry} closeModal={closeModal} deleteSuccess={deleteSuccess}/>}
        </div>
    );
};

export default CoordinatesPage;
