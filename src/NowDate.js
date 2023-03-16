import Date from "react-live-clock"; /* 년,월,일 */
import DaysOfTheWeek from "react-live-clock"; /* 요일 */



function NowDate() {

  return(
    <>
    <div className="text-center text-[#F8F9D7]">
      <Date format={'YYYY년 MM월 DD일 '} ticking={false} timezone={"Asia/Seoul"} /> 
      <DaysOfTheWeek 
        format={
          'ddd' === 'Sat' ? "토요일" 
          : 'ddd' === 'Sun' ? "일요일"
          : 'ddd' === 'Mon' ? "월요일"
          : 'ddd' === 'Tue' ? "화요일"
          : 'ddd' === 'Wed' ? "수요일"
          : 'ddd' === 'Thu' ? "목요일"
          : "금요일"
        } 
        ticking={false} timezone={"Asia/Seoul"} />
    </div>
    </>
  )
}

export default NowDate;