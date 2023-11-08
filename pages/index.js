import config from "../config.json"
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import { StyledTimeline } from "../src/components/Timeline";
import Menu from "../src/components/Menu";
import { useState } from "react";


function HomePage() {
    const homePageStyle = {};

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} />
            </div>
        </>
    )

}


export default HomePage;

// function Menu() {
//     return (
//         <div>Menu</div>
//     )
// }

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        margin-top: 50px;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;

function Header() {
    return (
        <StyledHeader>
            <section className="user-info">
                <img src={`http://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.description}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline(props) {

    function handleMouseEnter(video) {
        video.imgElement.src = video.thumbHover;
    }

    function handleMouseLeave(video) {
        video.imgElement.src = video.thumb;
    }


    const playlistName = Object.keys(props.playlists);

    return (
        <StyledTimeline>

            {playlistName.map(playlistName => {
                const videos = props.playlists[playlistName];
                console.log(videos);
                return (
                    <section>
                        <h2>{playlistName}</h2>
                        <div>
                            {
                                videos.map((video) => {
                                    return (
                                        <a
                                            href={video.url}
                                            onMouseEnter={() => handleMouseEnter(video)}
                                            onMouseLeave={() => handleMouseLeave(video)}
                                        >
                                            <img
                                                src={video.thumb}
                                                ref={(element) => (video.imgElement = element)}
                                            />
                                            <span>
                                                {video.title}
                                            </span>
                                        </a>
                                    )
                                })

                            }
                        </div>
                    </section>
                )
            })}

        </StyledTimeline>
    )
}

