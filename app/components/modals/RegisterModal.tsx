'use client';

import axios from 'axios';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import toast from 'react-hot-toast';
import Button from '../Button';
import LoginModal from './LoginModal';


const RegisterModal = () => {
  const  registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [ isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: {
        errors,
    }
  } = useForm<FieldValues>({
    defaultValues: {
        name: '',
        email: '',
        password: ''
    }
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios.post('/api/register', data)
    .then(() =>{
      toast.success('Success');
        registerModal.onClose();
        loginModal.onOpen();
    })
    .catch((error) =>{
        toast.error('Co gi do sai');
    })
    .finally(()=>{
        setIsLoading(false);
    })
  }
  const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();

  },[loginModal, registerModal]);

  const bodyContent =(
    <div className='flex flex-col gap-4'>
        <Heading  
        title="Welcome to Airbnb"
        subtitle="Create an Account"
        />
        <Input id="email" label="Email" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="name" label="Name" disabled={isLoading} register={register} errors={errors} required/>
        <Input id="password" type="password" label="Password" disabled={isLoading} register={register} errors={errors} required/>
    </div>
  );
  const footerContent =(
    <div className='flex flex-col gap-4 mt-3'>
      <hr />
      <Button 
       outline
       label="Continue with google"
       icon={FcGoogle}
       onClick={()=>{}}
      />
      <div className='text-neutral-500 text-center mt-4 font-light'>
        <div className='justify-center flex flex-row items-center gap-2'>
          <div>
          Already have an Account?
          </div>
          <div className='text-neutral-800 cursor-pointer hover:underline' onClick={toggle}> 
          Login
          </div>
        </div>
      </div>
    </div>
  )
    return (
      <Modal 
        disabled={isLoading}
        isOpen={registerModal.isOpen}
        title="Register"
        actionLable="Continue"
        onClose={registerModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        footer={footerContent} 
        // bo cai footer di
      />
    );
}
export default RegisterModal;