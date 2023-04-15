function Rate({ tasks, completedCount }) {
  const rate = Math.round((completedCount.length / tasks.length) * 100);
  const rateAni = {
    animation: "bounce 1s",
  };

  return (
    <div className="h-[24px] border rounded-xl mx-4 overflow-hidden bg-[#F8F9D7] ">
      <div
        className={`inline-block h-full w-full text-center text-[#6e85b7] font-bold`}
        style={rateAni}
      >{`${rate}% 완료`}</div>
    </div>
  );
}

export default Rate;
