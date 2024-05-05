import axios from 'axios'
import React from 'react'
import {SubmitHandler, useForm} from 'react-hook-form'
import {useNavigate} from "react-router-dom";
import {SERVER_URL} from "../Consts";
import {toast} from 'react-hot-toast'
import {FormError} from './FormError'

const LogIn = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: {errors},
        reset
    } = useForm({
        mode: 'onChange'
    })

    const onSubmit = async (data) => {
        if (data.password !== data.secondPassword) {
            alert('Passwords dont match')
            return
        }
        const res = await axios.post(`${SERVER_URL}/users/create`, data)
        if (res.status === 201) {
            navigate("/login");
            toast.success('successfully registered')
        }
    }

    function setLoginHandler() {
        navigate("/login");
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
                            htmlFor='username'
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
                            id='username'
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
                            className='block text-gray-700 text-sm font-bold mb-2'
                            htmlFor='username'
                        >
                            Email
                        </label>
                        <input
                            {...register('email', {
                                required: {
                                    value: true,
                                    message: 'Email is required!'
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/gm,
                                    message: 'Email is not valid!'
                                }
                            })}
                            id='email'
                            type='text'
                            placeholder='Email'
                            className={
                                'shadow appearance-none border rounded w-full py-2 px-3\n' +
                                '    text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                            }
                        />
                        {errors?.email?.message && (<FormError message={errors.email.message} />)}
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
                    <div className='mb-6'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2 dark:text-text-dark'
                            htmlFor='password'
                        >
                            Repeat Password
                        </label>
                        <input
                            {...register('secondPassword', {
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
                            id='secondpassword'
                            type='password'
                            placeholder='******************'
                            className={
                                'shadow appearance-none border rounded w-full py-2 px-3\n' +
                                '    text-gray-700 leading-tight focus:outline-none focus:border-blue-500'
                            }
                        />
                        {errors?.secondPassword?.message && (<FormError message={errors.secondPassword.message} />)}
                    </div>
                    <div className='flex items-center justify-between'>
                        <input
                            value={'Sign Up'}
                            type='submit'
                            className={'max-w-28 shadow appearance-none border rounded w-full py-2 px-3\n' +
                                'text-gray-700 leading-tight focus:outline-none focus:border-blue-500' +
                                'focus:outline-none cursor-pointer'}
                        ></input>

                        <div className={'flex items-center'}>
            <span className={'text-gray-400 text-xxs mr-1'}>
              Already Signed Up?
            </span>
                            <button
                                className='inline-block align-baseline font-bold text-sm text-blue-500
                hover:text-blue-800 dark:text-dark-primary dark:hover:text-dark-secondary'
                                onClick={setLoginHandler}
                            >
                                Sign In
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LogIn