import styled from "styled-components";
import CoordiImage from "@/components/CoordiImage";
import { usePostRecommendedOutfit } from "@/hooks/usePostRecommendedOutfit";
import { useLocateStore } from "@/store/LocateStore";
import { useState } from "react";
import IconRe from "@/assets/ui/IconRe";
import { Loader } from "@/components/Loader";
import ClothesImage from "@/components/CLothesImage";
import { useEffect } from "react";


interface Clothes {
    clothingId: number,
    clothingImagePath: string,
    clothingName: string,
}

interface LastItemProps {
    isLastItem: boolean
}

type dataType = {
  rate: string;
  date: string;
  locate: string;
  schedule: string;
  count: string;
};


const HaveSchedule = () => {
    const { recommenddata, mutate, isPending, isError } = usePostRecommendedOutfit();
    const {LocateInfo} = useLocateStore()
    const today:Date = new Date()
    const formattedDate:string = today.toISOString().split('T')[0]
    const [rate, setRate] = useState<number>(0)
    const addRate = () => {
        if (recommenddata.data[0].length != 0) {
            setRate(0)
        } else {
            setRate(rate + 1)
        }
    }
    const example: dataType = {
          rate: rate.toString(),
          date: formattedDate,
          locate: LocateInfo.toString(),
          schedule: "없음",
          count: "1"
        };
        
    useEffect(() => {
        // 조건을 추가하여 불필요한 호출을 방지
        if (rate >= 0 && LocateInfo) {
        mutate(example);
        }
    }, [rate, LocateInfo]);

    
    if (isPending || isError) {
        return (
            <Loader/>
        )
    } else {
        if (recommenddata) {
            console.log('출력', recommenddata)
            if (recommenddata.data[0].length != 0) {
        const clothesData = recommenddata.data.map(item => item[1])
        return (
        <Container>
            <Re>
                <IconRe onClick={addRate}/>
            </Re>
            <Message>오늘 같은 날씨에 제안합니다</Message>
            <CoordiList>
                {(isError || isPending) ? <Loader/> :  
                    (
                        // 
                        clothesData.map((item:Clothes, index:number) => {
                            console.log(clothesData)
                            const isLastItem = (index === recommenddata.data.length - 1)
                            return (
                                <Coordi isLastItem={isLastItem}>
                                    <ClothesImage clothingId={item.clothingId} clothingImagePath={item.clothingImagePath} clothingName={item.clothingName}/>
                                </Coordi>
                            )
                        })
                     )
                }
            </CoordiList>
            <button>오늘 일정 등록하기</button>
 
        </Container>
        )
    } else {
        return (
            <Container>
                <Re>
                    <IconRe onClick={addRate}/>
                </Re>
                <Message>오늘 같은 날씨에 제안합니다</Message>
                <CoordiList>
                    <span>충분한 데이터가 없습니다!</span>
                </CoordiList>
                <button>오늘 일정 등록하기</button>
    
            </Container>
        )
    }
    }
    // const testDLResponse = {isPending: false, isError: false, data:{outfit_list: [[1, 2, 3], [3, 4, 5], [5, 6, 7], [7, 8, 9], [9, 10, 11]]}}
    // return (
        
    // );
}
};

export default HaveSchedule;


const Container = styled.div`
position : relative;

`

const Message = styled.div`
text-align:center;
padding: 1rem;
font-size: 1.2rem;
font-weight: bolder;
color: black;
`

const CoordiList = styled.div`
display: flex;
width: 95%;
margin: 0 auto;
overflow-x: auto
`

const Re = styled.div`
    position: absolute;
    right: 1rem;
    top: 1rem;
`


const Coordi = styled.div<LastItemProps>`
height: 15vh;
min-width: 15vh;
margin: 0 ${({ isLastItem }) => (isLastItem ? '0' : '1rem')} 0.7rem 0;


`