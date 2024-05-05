import axios from 'axios'
import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../Consts";
import {useCookies} from "react-cookie";
import {toast} from 'react-hot-toast'
import {FormError} from './FormError'

const LogIn = () => {
    const navigate = useNavigate();
    const [cookie, setCookie] = useCookies(['userId'])
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: 'onChange'
    })

    const onSubmit = async (data) => {
        try {
            const res = await axios.post(`${SERVER_URL}/users/login`, data).catch((error) => {
                toast.error(error.response.data.message)
            })
            if (res && res.status === 200) {
                console.log(res)
                setCookie('userId', res.data.id, {path: '/'})
                navigate("/");
                toast.success('successfully logged in')
            }
        } catch (error) {
            console.log(error)
        }
    }

    function setSignUpHandler() {
        navigate("/signup");
    }

    return (
        <div className={'flex items-center justify-center min-h-dvh bg-gray-200'}>
            <div className={'w-full max-w-2xl bg-white'}>
                <form
                    className={'px-8 pt-6 pb-8 shadow-md'}
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className='mb-4 '>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='nickname'
                        >
                            Username
                        </label>
                        <input
                            {...register('nickname', {
                                required: {
                                    value: true,
                                    message: 'Enter a username!'
                                },
                                maxLength: 40
                            })}
                            id='nickname'
                            type='text'
                            placeholder='Username'
                            className={
                                'shadow appearance-none border rounded w-full py-2 px-3\n' +
                                '    text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                            }
                        />
                        {errors?.nickname?.message && (<FormError message={errors.nickname.message} />)}
                    </div>

                    <div className='mb-6'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2 dark:text-text-dark'
                            htmlFor='password'
                        >
                            Password
                        </label>
                        <input
                            {...register('password', {
                                required: {
                                    value: true,
                                    message: 'Password is required!'
                                },
                                maxLength: {
                                    value: 64,
                                    message: 'Max length - 64'
                                },
                                minLength: {
                                    value: 8,
                                    message: 'Min length - 8'
                                }
                            })}
                            id='password'
                            type='password'
                            placeholder='******************'
                            className={
                                'shadow appearance-none border rounded w-full py-2 px-3\n' +
                                '    text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                            }
                        />
                        {errors?.password?.message && (<FormError message={errors.password.message} />)}
                    </div>

                    <div className='flex items-center justify-between'>
                        <input
                            value={'Log In'}
                            type='submit'
                            className={'max-w-28 shadow appearance-none border rounded w-full py-2 px-3\n' +
                                'text-gray-700 leading-tight focus:outline-none focus:border-blue-500' +
                                'focus:outline-none cursor-pointer'}
                        ></input>

                        <div className={'flex items-center'}>
            <span className={'text-gray-400 text-xxs mr-1'}>
              Want to Sign Up?
            </span>
                            <button
                                className='inline-block align-baseline font-bold text-sm text-blue-500
                hover:text-blue-800 dark:text-dark-primary dark:hover:text-dark-secondary'
                                onClick={setSignUpHandler}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn