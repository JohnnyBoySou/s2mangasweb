import React, { useEffect } from 'react';
import './ad.css'

const Ad = () => {
    useEffect(() => {
        // Carregar o script do Google Ads
        const script = document.createElement('script');
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7579936116181719";
        script.async = true;
        document.body.appendChild(script);

        // Inicializar os anúncios do Google Ads
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    return (
        <div className="ad-container">
            <ins className="adsbygoogle"
                style={{ display: 'block' }}
                data-ad-client="ca-pub-7579936116181719"
                data-ad-slot="SEU_SLOT_DO_ANÚNCIO"
                data-ad-format="auto"
                data-full-width-responsive="true"></ins>
        </div>
    );
};

export default Ad;

