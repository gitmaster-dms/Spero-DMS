import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, useMediaQuery, IconButton, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import loginBg from '../../assets/Bg_login1.png';
import Spero from '../../assets/spero1.png';
import { useNavigate } from 'react-router-dom';
import CachedIcon from '@mui/icons-material/Cached';

function Login() {


    const port = import.meta.env.VITE_APP_API_KEY;
    // console.log(port,'port');

    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [emp_username, setEmp_Username] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [loading, setLoading] = useState(false);

    // Captcha states
    const [captchaKey, setCaptchaKey] = useState('');
    const [captchaImageUrl, setCaptchaImageUrl] = useState('');
    const [captchaValue, setCaptchaValue] = useState('');
    const [captchaLoading, setCaptchaLoading] = useState(true);
    const [captchaError, setCaptchaError] = useState(false);
    const [captchaTextError, setCaptchaTextError] = useState('');


    useEffect(() => {
        document.title = "DMS|Login";
    }, []);


    // Function to fetch new captcha
    const fetchCaptcha = async () => {
        try {
            setCaptchaLoading(true);
            setCaptchaError(false);

            // Add timeout to the fetch to prevent long waits
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

            const response = await fetch(`${port}/admin_web/login/captcha/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            const data = await response.json();
            console.log('Captcha response:', data);

            if (data.captcha_key && data.captcha_image_url) {
                setCaptchaKey(data.captcha_key);
                // Make sure the URL is properly formatted with the base URL
                const fullImageUrl = data.captcha_image_url.startsWith('http')
                    ? data.captcha_image_url
                    : `${port}${data.captcha_image_url}`;

                setCaptchaImageUrl(fullImageUrl);
                console.log('Captcha image URL:', fullImageUrl);
                // Reset captcha value when new captcha is fetched
                setCaptchaValue('');
            } else {
                console.error('Invalid captcha response format');
                setCaptchaError(true);
            }
        } catch (err) {
            console.error('Error fetching captcha:', err);
            if (err.name === 'AbortError') {
                console.error('Request timed out');
            } else if (err.message && err.message.includes('Failed to fetch')) {
                console.error('Connection refused - server might be down');
            }
            setCaptchaError(true);
        } finally {
            setCaptchaLoading(false);
        }
    };

    // Load captcha on component mount
    useEffect(() => {
        fetchCaptcha();
        console.log('Mounting Login component, fetching captcha...');
    }, []);

    // const handleLogin = async () => {
    //     setUsernameError('');
    //     setPasswordError('');
    //     setCaptchaTextError('');

    //     let hasError = false;

    //     if (!emp_username) {
    //         setUsernameError('Please enter User ID');
    //         hasError = true;
    //     }

    //     if (!password) {
    //         setPasswordError('Please enter Password');
    //         hasError = true;
    //     }

    //     if (captchaError || (!captchaValue && captchaKey)) {
    //         setCaptchaTextError('Please enter valid captcha text');
    //         hasError = true;
    //     }

    //     if (hasError) {
    //         return;
    //     }

    //     try {
    //         setLoading(true);

    //         const controller = new AbortController();
    //         const timeoutId = setTimeout(() => controller.abort(), 5000);

    //         const response = await fetch(`${port}/admin_web/login/`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({
    //                 emp_username,
    //                 password,
    //                 captcha_key: captchaKey,
    //                 captcha_value: captchaValue,
    //             }),
    //             signal: controller.signal,
    //         });

    //         clearTimeout(timeoutId);

    //         const data = await response.json();
    //         console.log('Login response:', data);

    //         if (!response.ok) {
    //             // Handle DRF-style errors first
    //             if (data.errors?.non_field_errors?.[0]?.toLowerCase().includes('captcha')) {
    //                 setCaptchaTextError('Invalid captcha. Please try again.');
    //                 fetchCaptcha();
    //             } else if (data.errors?.non_field_errors?.[0]) {
    //                 setPasswordError(data.errors.non_field_errors[0]);
    //             } else if (data.msg && data.msg.toLowerCase().includes('captcha')) {
    //                 setCaptchaTextError('Invalid captcha. Please try again.');
    //                 fetchCaptcha();
    //             } else {
    //                 setPasswordError('Invalid User ID or Password');
    //             }
    //             return;
    //         }

    //         // Handle successful login
    //         // if (data.token) {
    //         //     localStorage.setItem('token', data.token.access); // or store full token if needed
    //         //     localStorage.setItem('user', JSON.stringify(data.token.colleague)); // ✅ Store user info
    //         //     navigate('/alert-panel');


    //         // }
    //         // Handle successful login
    //         if (data.token) {
    //             localStorage.setItem('access_token', data.token.access);
    //             localStorage.setItem('refresh_token', data.token.refresh);
    //             localStorage.setItem('user', JSON.stringify(data.token.colleague));
    //             localStorage.setItem('user_group', data.token.user_group);

    //             // 🔍 Console logs
    //             console.log('Access Token:', data.token.access);
    //             console.log('Refresh Token:', data.token.refresh);
    //             console.log('User Group:', data.token.user_group);
    //             console.log('User Info:', data.token.colleague);

    //             navigate('/alert-panel');
    //         }


    //         else {
    //             console.error('Login response did not contain token');
    //             setPasswordError('Login failed. Please try again.');
    //         }

    //     } catch (err) {
    //         console.error('Login error:', err);
    //         if (err.name === 'AbortError') {
    //             setPasswordError('Login request timed out. Server might be down.');
    //         } else if (err.message?.includes('Failed to fetch')) {
    //             setPasswordError('Cannot connect to server. Please check if backend is running.');
    //         } else {
    //             setPasswordError('Login failed. Please try again.');
    //         }
    //     } finally {
    //         setLoading(false);
    //     }
    // };


    const handleLogin = async () => {
        setUsernameError('');
        setPasswordError('');
        setCaptchaTextError('');

        let hasError = false;

        if (!emp_username) {
            setUsernameError('Please enter User ID');
            hasError = true;
        }

        if (!password) {
            setPasswordError('Please enter Password');
            hasError = true;
        }

        if (captchaError || (!captchaValue && captchaKey)) {
            setCaptchaTextError('Please enter valid captcha text');
            hasError = true;
        }

        if (hasError) {
            return;
        }

        try {
            setLoading(true);

            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 5000);

            const response = await fetch(`${port}/admin_web/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emp_username,
                    password,
                    captcha_key: captchaKey,
                    captcha_value: captchaValue,
                }),
                signal: controller.signal,
            });

            clearTimeout(timeoutId);

            const data = await response.json();
            console.log('Login response:', data);

            if (!response.ok) {
                if (data.errors?.non_field_errors?.[0]?.toLowerCase().includes('captcha')) {
                    setCaptchaTextError('Invalid captcha. Please try again.');
                    fetchCaptcha();
                } else if (data.errors?.non_field_errors?.[0]) {
                    setPasswordError(data.errors.non_field_errors[0]);
                } else if (data.msg && data.msg.toLowerCase().includes('captcha')) {
                    setCaptchaTextError('Invalid captcha. Please try again.');
                    fetchCaptcha();
                } else {
                    setPasswordError('Invalid User ID or Password');
                }
                return;
            }

            if (data.token) {
                localStorage.setItem('access_token', data.token.access);
                localStorage.setItem('refresh_token', data.token.refresh);
                localStorage.setItem('user', JSON.stringify(data.token.colleague));
                localStorage.setItem('user_group', data.token.user_group);

                console.log('Access Token:', data.token.access);
                console.log('Refresh Token:', data.token.refresh);
                console.log('User Group:', data.token.user_group);
                console.log('User Info:', data.token.colleague);
                const group = data.token.user_group;
                console.log('Stored group from localStorage:', localStorage.getItem('user_group'));

                if (group === '1') {
                    navigate('/add-group');
                } else if (group === '2') {
                    navigate('/alert-panel');
                } else if (group === '3') {
                    navigate('/multiscreen');
                } else {
                    console.warn('Unhandled user group:', group);
                    // Optionally redirect to a fallback route
                    navigate('/not-authorized');
                }

                //  IMPORTANT: Only trigger WebSocket for group '3'
                if (group === '3') {
                    console.log(' GROUP 3 DETECTED - WebSocket will be triggered');
                    navigate('/multiscreen');

                    // WebSocket connection ONLY for user group 3
                    setTimeout(() => {
                        try {
                            console.log(' Creating WebSocket connection for group 3');
                            const socket = new WebSocket("ws://192.168.1.116:7777/send_data");
                            socket.onopen = () => {
                                console.log(" WebSocket connected for group 3");
                                socket.send("true");
                                console.log(" Sent 'true' to server for group 3");
                            };
                            socket.onerror = (err) => {
                                console.error(" WebSocket error:", err);
                            };
                        } catch (err) {
                            console.error("WebSocket connection failed:", err);
                        }
                    }, 2000);

                } else if (group === '1') {
                    console.log(' GROUP 1 DETECTED - NO WebSocket - Navigating to /add-group');
                    navigate('/add-department');
                } else if (group === '2') {
                    console.log(' GROUP 2 DETECTED - NO WebSocket - Navigating to /alert-panel');
                    navigate('/alert-panel');
                } else {
                    console.warn('Unhandled user group:', group);
                    navigate('/not-authorized');
                }

            } else {
                console.error('Login response did not contain token');
                setPasswordError('Login failed. Please try again.');
            }

        } catch (err) {
            console.error('Login error:', err);
            if (err.name === 'AbortError') {
                setPasswordError('Login request timed out. Server might be down.');
            } else if (err.message?.includes('Failed to fetch')) {
                setPasswordError('Cannot connect to server. Please check if backend is running.');
            } else {
                setPasswordError('Login failed. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };


    const [openForgotDialog, setOpenForgotDialog] = useState(false);
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState(''); // mobile no or email

    const handleForgotPasswordSubmit = () => {
        // Call your API or validation logic here
        console.log("Username:", username);
        console.log("Contact:", contact);
        // Close dialog after submit
        setOpenForgotDialog(false);
    };




    return (
        <Box sx={{ height: '100vh', width: '100%', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: isSmallScreen ? 'column' : 'row' }}>

            {/* Background Image */}
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    height: '100%',
                    width: '100%',
                    backgroundImage: `url(${loginBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    zIndex: 0,
                }}
            />

            {/* Foreground */}
            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: isSmallScreen ? 'column' : 'row',
                }}
            >
                {!isSmallScreen && <Box sx={{ flex: 1 }} />}

                {/* Form Panel */}
                <Box
                    sx={{
                        width: isSmallScreen ? '100%' : '350px',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        background: 'radial-gradient(6035.71% 72.44% at 0% 50%, rgba(95, 236, 200, 0.7) 0%, rgba(95, 236, 200, 0.035) 100%)',
                        backdropFilter: 'blur(10px)',
                    }}
                >
                    <Box
                        sx={{
                            width: '80%',
                            maxWidth: 400,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                        }}
                    >
                        <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
                            <b>User Login</b>
                        </Typography>

                        <Box sx={{ width: '100%', mb: 2 }}>
                            <Typography sx={{ color: 'white', mb: 0.5, fontWeight: 500, fontSize: '12px' }}>
                                User Name
                            </Typography>
                            <TextField
                                value={emp_username}
                                onChange={(e) => setEmp_Username(e.target.value)}
                                fullWidth
                                variant="outlined"
                                placeholder="Enter Name"
                                InputLabelProps={{ shrink: false }}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: 'black',
                                    },
                                    borderRadius: '12px',
                                    '& fieldset': {
                                        borderRadius: '8px',
                                    },
                                    backgroundColor: 'white',
                                    '& input::placeholder': {
                                        fontSize: '0.75rem',
                                        color: '#9e9e9e',
                                    },
                                }}
                            />
                            {usernameError && (
                                <Typography sx={{
                                    color: '#ff1744',
                                    fontSize: '0.75rem',
                                    mt: 0.5,
                                    ml: 0.5
                                }}>
                                    {usernameError}
                                </Typography>
                            )}
                        </Box>

                        <Box sx={{ width: '100%', mb: 2 }}>
                            <Typography sx={{ color: 'white', mb: 0.5, fontWeight: 500, fontSize: '12px' }}>
                                Password
                            </Typography>
                            <TextField
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                fullWidth
                                variant="outlined"
                                placeholder="Enter Password"
                                type="password"
                                InputLabelProps={{ shrink: false }}
                                sx={{
                                    '& .MuiInputBase-input': {
                                        color: 'black',
                                    },
                                    borderRadius: '12px',
                                    '& fieldset': {
                                        borderRadius: '8px',
                                    },
                                    backgroundColor: 'white',
                                    '& input::placeholder': {
                                        fontSize: '0.75rem',
                                        color: '#9e9e9e',
                                    },
                                }}
                            />
                            {passwordError && (
                                <Typography sx={{
                                    color: '#ff1744',
                                    fontSize: '0.75rem',
                                    mt: 0.5,
                                    ml: 0.5
                                }}>
                                    {passwordError}
                                </Typography>
                            )}
                        </Box>

                        {/* Captcha Section */}
                        <Box sx={{ width: '100%', mb: 2 }}>
                            {/* Captcha Label (Typography) */}
                            <Typography sx={{ color: 'white', mb: 0.5, fontWeight: 500, fontSize: '12px' }}>
                                Captcha
                            </Typography>

                            {/* Captcha Image and Input Row */}
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {/* Captcha Image Container */}
                                {!captchaLoading && !captchaError && (
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            height: '40px', // Ensures the image is vertically aligned
                                            mr: 1, // Adds space between the image and input field
                                        }}
                                    >
                                        <Box
                                            component="img"
                                            src={captchaImageUrl}
                                            alt="Captcha"
                                            onError={() => setCaptchaError(true)}
                                            sx={{
                                                height: '85%',
                                                maxWidth: '100px',  // Controls the size of the captcha image
                                                objectFit: 'contain',
                                                background: 'transparent', // Ensures no background in the image container
                                            }}
                                        />
                                    </Box>
                                )}

                                {/* Captcha Input Field */}
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                        borderRadius: '8px',
                                        px: 1,
                                        py: 0.5,
                                    }}
                                >
                                    <TextField
                                        value={captchaValue}
                                        onChange={(e) => setCaptchaValue(e.target.value)}
                                        placeholder="Enter Captcha"
                                        variant="outlined"
                                        InputLabelProps={{ shrink: false }}
                                        inputProps={{
                                            style: {
                                                fontSize: '0.75rem',
                                                padding: '6px 10px',
                                                width: '100px',  // Controls input box width
                                            },
                                        }}
                                        sx={{
                                            '& .MuiInputBase-input': { color: 'black' },
                                            '& fieldset': { borderRadius: '6px' },
                                            backgroundColor: 'white',
                                            mr: 1,
                                        }}
                                    />

                                    {/* Refresh Icon */}
                                    <IconButton
                                        onClick={fetchCaptcha}
                                        size="small"
                                        sx={{
                                            color: '#101329',
                                            backgroundColor: '#f0f0f0',
                                            '&:hover': {
                                                backgroundColor: '#e0e0e0',
                                            },
                                        }}
                                    >
                                        <CachedIcon />
                                    </IconButton>
                                </Box>
                            </Box>

                            {/* Captcha Error */}
                            {captchaTextError && (
                                <Typography sx={{
                                    color: '#ff1744',
                                    fontSize: '0.75rem',
                                    mt: 0.5,
                                    ml: 0.5
                                }}>
                                    {captchaTextError}
                                </Typography>
                            )}

                        </Box>

                        <Button
                            fullWidth
                            variant="contained"
                            onClick={handleLogin}
                            disabled={loading}
                            sx={{
                                mt: 2,
                                width: '50%',
                                backgroundColor: '#101329',
                                color: '#fff',
                                borderRadius: '30px',
                                textTransform: 'none',
                                fontWeight: 'bold',
                                border: loading ? '2px solid #101329' : 'none',
                                '&:hover': {
                                    backgroundColor: '#101329',
                                },
                            }}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </Button>
                        <Box
                            sx={{
                                width: '100%',
                                mt: 2,
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <Typography
                                component="span"
                                onClick={() => setOpenForgotDialog(true)}
                                sx={{
                                    textDecoration: 'underline',
                                    color: 'primary.main',
                                    cursor: 'pointer',
                                }}
                            >
                                Forgot Password?
                            </Typography>
                        </Box>



                        <Box
                            component="img"
                            src={Spero}
                            alt="Spero Logo"
                            sx={{
                                width: '100px',
                                mt: 5,
                            }}
                        />
                    </Box>


                </Box>
                <Dialog open={openForgotDialog} onClose={() => setOpenForgotDialog(false)}
                    PaperProps={{
                        sx: {
                            background: 'radial-gradient(6035.71% 72.44% at 0% 50%, rgba(95, 236, 200, 0.7) 0%, rgba(95, 236, 200, 0.035) 100%)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '12px',
                            padding: 2,
                        }
                    }}>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                        <Typography sx={{ color: 'white', fontWeight: 500, fontSize: '12px' }}>
                            Enter User Name
                        </Typography>

                        <TextField

                            fullWidth
                            variant="outlined"
                            placeholder="Enter User Name"
                            type="name"
                            InputLabelProps={{ shrink: false }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                },
                                borderRadius: '12px',
                                '& fieldset': {
                                    borderRadius: '8px',
                                },
                                backgroundColor: 'white',
                                '& input::placeholder': {
                                    fontSize: '0.75rem',
                                    color: '#9e9e9e',
                                },
                            }}
                        />

                        <Typography sx={{ color: 'white', fontWeight: 500, fontSize: '12px' }}>
                            Email or Mobile Number
                        </Typography>
                        <TextField
                            fullWidth
                            variant="outlined"
                            placeholder="Email or Mobile Number"
                            onChange={(e) => setContact(e.target.value)}
                            InputLabelProps={{ shrink: false }}
                            sx={{
                                '& .MuiInputBase-input': {
                                    color: 'black',
                                },
                                borderRadius: '12px',
                                '& fieldset': {
                                    borderRadius: '8px',
                                },
                                backgroundColor: 'white',
                                '& input::placeholder': {
                                    fontSize: '0.75rem',
                                    color: '#9e9e9e',
                                },
                            }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpenForgotDialog(false)} sx={{
                            mt: 1,
                            width: '50%',
                            // backgroundColor: '#101329',
                            color: '#fff',
                            borderRadius: '30px',
                            textTransform: 'none',
                            fontWeight: 'bold',

                        }}>Cancel</Button>
                        <Button variant="contained" onClick={handleForgotPasswordSubmit} sx={{
                            mt: 1,
                            width: '50%',
                            backgroundColor: '#101329',
                            color: '#fff',
                            borderRadius: '30px',
                            textTransform: 'none',
                            fontWeight: 'bold',
                            border: loading ? '2px solid #101329' : 'none',
                            '&:hover': {
                                backgroundColor: '#101329',
                            },
                        }}>Submit</Button>
                    </DialogActions>
                </Dialog>

            </Box>
        </Box>
    );
}

export default Login;