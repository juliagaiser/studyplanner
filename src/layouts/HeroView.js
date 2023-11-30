
import React, { useState, useEffect } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useNavigate, useParams } from 'react-router-dom';
import Lottie from 'lottie-react';
import lottieAnimation from './assets/Animation - 1699625885903.json';
import { Box } from '@mui/material';
import { Player } from '@lottiefiles/react-lottie-player';


function HeroView() {

    return (
        <main className='content'>
            <div id="content" className="px-4 mx-auto table-responsive">
                <div className="contentwrapper d-flex flex-column">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="hero">
                                    <div className="heading">
                                        <h1 className="secondary-text">Willkommen bei Lecture-App Pro</h1>



                                        <h1>Effiziente Verwaltung von Vorlesungen, Dozenten und Vorlesungsterminen</h1>
                                        <p>Bereit für eine Revolution in der Organisation Ihrer Vorlesungen und Dozenten? Lecture-App Pro ist Ihre umfassende Lösung für die nahtlose Verwaltung und Optimierung des Lehrbetriebs. Von der Planung von Vorlesungen bis zur gezielten Zuweisung von Dozenten – alles an einem Ort.</p>
                                        <div className="ms-2" ><a className="btn btn-primary button large glow active" href="#">Mehr erfahren</a></div>

                                    </div>
                                </div>

                            </div>
                            <div className="col-md-6 animation">

                                {/* <Lottie
                                    animationData={lottieAnimation} // Path to your Lottie JSON file
                                    loop={true} // Set to true for looping
                                    autoplay={true} // Set to true for autoplay
                                /> */}
                                <Box width="100%">
                                    <Player
                                        src="https://assets8.lottiefiles.com/packages/lf20_w4kou3mriQ.json"
                                        className="player"
                                        loop
                                        autoplay
                                    />
                                </Box>






                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </main>
    );
}

export default HeroView;





