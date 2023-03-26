
function Rate({ tasks, completedCount }) {

  const rate = Math.round(completedCount.length / tasks.length * 100);
  const rateAni = {
    animation: 'bounce 1s',
  }

  return ( 
    <div className="h-[24px] w-[342px] border rounded-xl mx-4 overflow-hidden bg-[#F8F9D7] ">
      <div className={`inline-block h-full w-full text-center`} style={rateAni}>{`${rate}% 완료`}</div>
    </div>
  )

}


export default Rate;