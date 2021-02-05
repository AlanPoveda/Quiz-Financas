import styled from 'styled-components';


const Coin = styled.div`
    display : inline-block-size;
    height: 40px;
    width: 40px;
    background-image: url(./descarga.png);
    background-repeat: no-repeat;
    background-position: 0px 0px;

`;


function CoinSprite(){

    return(
        <div>
            <Coin className="box"/>
        </div>

    )
}

export default CoinSprite;