// components/QuestionCard.jsx
export default function QuestionCard({ question, options, onAnswer }) {
  return (
    <div className="border-4 border-game-black bg-white p-4 shadow-retro">
      <h2 className="font-pixel text-xs mb-4 leading-relaxed">
        {question}
      </h2>
      <div className="grid grid-cols-1 gap-4">
        {options.map((opt) => (
          <button 
            key={opt}
            onClick={() => onAnswer(opt)}
            className="font-retro text-lg border-2 border-game-black p-2 hover:bg-game-mid active:translate-y-1 transition-all"
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}