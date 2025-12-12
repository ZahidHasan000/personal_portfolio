import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import Navbar from './Navbar';
import Sidebar from './SideBar';
import BackGroundImage from './BackGround';
import Map from './Map';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import './Contact.css';

function Contact() {
    const form = useRef();
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isEmailError, setIsEmailError] = useState(false);
    const [isNameError, setIsNameError] = useState(false);


    const sendEmail = (e) => {
        e.preventDefault();

        const email = form.current?.from_email?.value;
        const name = form.current?.from_name?.value;

        if (!validateEmail(email)) {
            setIsEmailError(true);
            setIsError(true);
            setTimeout(() => {
                setIsEmailError(false); // Reset email error after 2 seconds
                setIsError(false); // Reset general error after 2 seconds
            }, 2000);
            return;
        } else {
            setIsEmailError(false);
            setIsError(false); // Reset general error immediately when email is valid
            // Show success message
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false); // Reset success message after 2 seconds
            }, 2000);
        }

        // Name validation
        if (!name) {
            setIsNameError(true);
            setIsError(true);
            return;
        } else {
            setIsNameError(false);
        }

        emailjs
            .sendForm('service_myrmaan', 'template_phwg0vm', form.current, {
                publicKey: 'QYEykU2GdDW_FdcjR',
            })
            .then(
                () => {
                    console.log('SUCCESS!');
                    setIsSuccess(true);
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setIsError(true);
                },
            );
    };

    // Email format validation function
    const validateEmail = (email) => {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    };


    return (
        <div className='contact-container_main'>
            <Navbar />
            <Sidebar />
            <BackGroundImage />
            <div className='contact-container flex flex-col md:flex-row'>
                <div className='contact mt-2 md:mt-8 pt-2 md:pt-8 ml-6 md:ml-8 pl-4 md:pl-8 text-left'>
                    <Box
                        component="form"
                        ref={form}
                        onSubmit={sendEmail}
                        sx={{
                            '& .MuiTextField-root': {
                                m: 1,
                                // width: '40ch',
                                '& input::placeholder': {
                                    color: 'white',
                                },
                                '& .MuiInputLabel-root': {
                                    color: 'white',
                                },
                                '& input': {
                                    color: 'white',
                                    borderColor: isError ? 'red' : 'blue',
                                },
                            },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div className='input flex flex-col items-center justify-center'>
                            <div className='info text-left pb-1 md:pb-5 pl-2 md:pl-0'>
                                <h3 className='text-green pb-0'>Contact with me</h3>
                                <p className='paragaraph text-white'>
                                    I am interested in freelance opportunities, especially ambitious or large projects. However, if you have other requests or
                                    questions, don't hesitate to contact me using the below form either.
                                </p>
                            </div>

                            {/* <div className="name flex flex-row mb-0 md:mb-4 pl-0 md:pl-5"> */}
                            <div className="name flex flex-row mb-0 md:mb-4 pl-0 md:pl-5 gap-2">
                                <TextField
                                    id="Name"
                                    label="Name"
                                    name="from_name"
                                    type='text'
                                    placeholder="Full Name"
                                    required
                                    error={isNameError}
                                    sx={{ width: '33.25ch' }}
                                    className="mr-2 w-1/2"
                                />
                                <TextField
                                    id="Email"
                                    label="Email"
                                    name="from_email"
                                    type='email'
                                    placeholder="example@example.com"
                                    required
                                    // error={!validateEmail(form.current?.from_email?.value)}
                                    error={isEmailError}
                                    sx={{ width: '33.25ch' }}
                                    className="email w-1/2"
                                />
                            </div>

                            <div className='message pl-0 md:pl-5'>
                                <TextField
                                    id="Message"
                                    label="Message"
                                    name="message"
                                    placeholder="How i can help you?"
                                    multiline
                                    rows={4}
                                    InputProps={{ style: { color: 'white' } }}
                                    className='mess'
                                />
                            </div>
                            <div className='btn pl-2 md:pl-5 pt-2 md:pt-5'>
                                <button className='button w-[66.5ch] text-green-500 hover:text-green-700' type='submit'>Send</button>
                            </div>
                            <div className="message-box m-2 md:m-3">
                                {isSuccess && <p className="success-message">Email sent successfully!</p>}
                                {isError && <p className="error-message">Failed to send email. Please try again later.</p>}
                            </div>
                        </div>
                    </Box>
                </div>
                <div className="map ml-2 sm:ml-5 mt-1 sm:mt-3">
                    <Map />
                </div>
            </div>

        </div>
    );
}

export default Contact;



