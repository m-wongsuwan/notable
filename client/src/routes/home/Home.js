import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

    const linkStyle = {
        textDecoration: "none",
        fontSize: "20px",
        color: "white",
        margin: "0px 20px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center"
    }

    return (
        <div className='home'>
            <div className="home--signupBanner" ><Link to='/signup' style={linkStyle} >Sign Up</Link></div>
            <div className="home--hero">
                <h1>Take Note</h1>
                <div animation>
                    <p className="hero--text">Your person is waiting for you, sign up now!</p>                  
                </div>
            </div>
            <div className="home--cutiesDisplay">
                <img className="home--personImg down" src="https://images.unsplash.com/photo-1578979879663-4ba6a968a50a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YXR0cmFjdGl2ZSUyMHdvbWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="cute person" />
                <img className="home--personImg up" src="https://images.unsplash.com/photo-1593757147298-e064ed1419e5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8YXR0cmFjdGl2ZSUyMG1hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="cute person" />
                <img className="home--personImg down trimImage" src="https://images.unsplash.com/photo-1589156280159-27698a70f29e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YmxhY2slMjB3b21hbnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="cute person" />
                <img className="home--personImg up trimImage" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60" alt="cute person" />
            </div>
            <div className="home--body">
                <div className="home--bodyLeft">
                    <div className="home--textLeft home--text">
                        <h2>Online Dating for Cuties</h2>
                        <p>Face it, you're special! Join our community of singles looking for the real thing. Come as you are.</p>   
                    </div>
                    <div className="home--topImgDiv">
                        <img className="home--leftImg home--bodyImg" src="https://images.unsplash.com/photo-1548051072-b34898021f8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="cute person" />
                    </div>
                </div>
                <div className="home--bodyRight">
                <div className="home--bottomImgDiv">
                    <img className="home--rightImg home--bodyImg" src="https://images.unsplash.com/photo-1596529840530-83900a28cfc3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHF1ZWVyJTIwZGF0ZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60" alt="cute person" />

                </div>
                
                    <div className="home--textRight home--text">
                        <h2>How it Works</h2>
                        <p>Positive vibes only! Leave notes letting people know what caught your eye, others will do the same. If you're both interested, get chatting and get off dating sites for good!</p>
                        <br />
                        <p>(Can you tell I'm not gunning for a copywriting position)</p>
                    </div>
                </div>
            </div>
        </div>
    )
}