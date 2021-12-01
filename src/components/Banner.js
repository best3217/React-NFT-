/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState  } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { format } from 'date-fns';
import { getMintedTotal } from './util/interact';

const Banner = () => {
    let date = format(new Date(), 'yyyy-MM-dd');
    const [totalNFT, setTotal] = useState(0);
    const [mintedNFT, setMintedNFT] = useState('');

    useEffect(() => {
        const url = "https://api.opensea.io/api/v1/collection/doodles-official/stats";

        async function fetchData(){
            try {
                    const response = await fetch(url);
                    const json = await response.json();
                    setTotal(json.stats.total_sales);
                } catch (error) {
                    console.log("error", error);
                }
        };

        async function getNFTTotal() {
            let minted =  await getMintedTotal();
            setMintedNFT(minted);
        }

        getNFTTotal();
        fetchData();

    });

    return(
        <div className="banner" style={{ backgroundImage: `url(./homebanner.png)` }}>
            <div className="container position-relative">
                <h3 className="text-white text-lg-end sub-title">Welcome to the</h3>
                <h1 className="title">Post-Apocalyptic</h1>

                <div className="row">
                    <div className="col-lg-5">
                        <div className="ntf-info">
                            <h2 className="text-white"> {date} </h2>
                            <p>{ mintedNFT } NTFS Sold <span className="ms-3">{totalNFT} NFTs available</span></p>
                        </div>
                    </div>
                    <div className="col-lg-6 offset-xl-1">
                        <p  style={{ marginBottom: 95 }}>The Post-Apocalyptic world has been divided into different quadrants where 10,000 Armored Warriors battle each other for survival. Each Post-Apocalyptic NFT is a unique ERC-721 digital collectible living on the Ethereum blockchain.</p>
                        <div className="d-md-flex align-items-center justify-content-between text-center">
                            <a href="#" className="mb-5 mb-md-0 btn" rel="noreferrer" target="_blank">See on opnesea</a>
                             <ul className="social-link d-flex gap-5 mb-0 justify-content-center justify-content-md-start">
                                <Router>
                                    <li>
                                        <a href="https://twitter.com/pst_apocalypse" className="social-item">
                                            <img src="/twitter.svg" />
                                            Twitter
                                        </a>
                                    </li>

                                    <li>
                                        <a  href="https://discord.gg/z9y8BE2znv" className="social-item">
                                            <img src="/discord.svg" />
                                            Discord
                                        </a>
                                    </li>
                                </Router>
                             </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="divide"></div>
        </div>
    );
}

export default Banner;