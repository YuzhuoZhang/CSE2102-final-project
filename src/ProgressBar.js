function ProgressBar({ currentQuestionIndex, totalQuestions }) {
    const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
    return (
      <div style={{ width: '100%', backgroundColor: '#ddd' }}>
        <div style={{ height: '20px', width: `${progress}%`, backgroundColor: 'green' }}></div>
      </div>
    );
  }
  
  export default ProgressBar;
  