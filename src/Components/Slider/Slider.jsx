import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SliderData } from './SliderData';

const Container = styled.div`
  width: 100vw;
  height: 25vw;
    /* width: 100%; */
`;
const Section = styled.div`
  text-align: center;
  display: flex;
  overflow: hidden;
`;

const SlideArt = styled.article.attrs()`
  position: absolute;
  left: 0;
  width: 100%;
  height: 25vw;
  opacity: 0;
  transition: all 0.3s linear;
  align-items: center;

  &.activeSlide {
    opacity: 1;
    transform: translateX(0);
  }
  &.lastSlide {
    transform: translateX(-100%);
  }
  &.nextSlide {
    transform: translateX(100%);
  }
`;
const Images = styled.img`
  object-fit: contain;
  height: 25vw;
  width: 100%;
`;
const ArrowsPrevious = styled.p`
  left:0;
`;
const ArrowsNext = styled.p`
 right: 0;
`;
const Slider = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const lastIndex = SliderData.length -1;
    if(index < 0 ){
      setIndex(lastIndex)
    }
    if(index > lastIndex){
      setIndex(0)
    }
  },[index]);
  useEffect(() => {
    let slide = setInterval(() =>{
      setIndex(index+1);
    }, 5000);
    return() => {
      clearInterval(slide)
    }
  },[index])
    return (
        <Container>
            <Section>
              {SliderData.map((image, idx) =>{
                let position = 'nextSlide';
                if(idx ===index){
                  position = 'activeSlide'
                  
                }
                if(idx === index-1 || (index === 0 & idx === SliderData - 1)) {
                  position = 'lastSlide';
                }
                return (
                    <SlideArt className={position} key={idx}>
                      <Images src={image.image} alt="Slider Pictures" />
                    </SlideArt>
                )
              })}
              <ArrowsPrevious onClick={ () => setIndex(index - 1)}>
              </ArrowsPrevious>
              <ArrowsNext onClick={ () => setIndex(index + 1)}>

              </ArrowsNext>
            </Section>
        </Container>
    )
}

export default Slider;