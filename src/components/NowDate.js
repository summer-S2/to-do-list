
function NowDate() {

  const today = new Date();

  // console.log(today);

  return (
    <>
      <div className="text-center text-[#F8F9D7]">
        <div className="inline-block pr-2">
          {today.getFullYear()}{`년 `}
          {today.getMonth() + 1}{`월 `}
          {today.getDate()}{`일 `}
        </div>
        <div className="inline-block">
          {today.getDay() === 0
            ? "일요일"
            : today.getDay() === 1
            ? "월요일"
            : today.getDay() === 2
            ? "화요일"
            : today.getDay() === 3
            ? "수요일"
            : today.getDay() === 4
            ? "목요일"
            : today.getDay() === 5
            ? "금요일"
            : "토요일"}
        </div>
      </div>
    </>
  )

}

export default NowDate;