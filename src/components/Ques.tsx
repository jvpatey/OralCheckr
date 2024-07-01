import { Type, QuesProps } from "../common/Types";

export function Ques({ id, title, type, options }: QuesProps) {
  return (
    <div>
      <h2>{title}</h2>
      {type === Type.RADIO &&
        options.map((option) => (
          <div key={option.optionId}>
            <input
              type="radio"
              id={`${id}-${option.optionId}`}
              name={`question-${id}`}
              value={option.optionLabel}
            />
            <label htmlFor={`${id}-${option.optionId}`}>
              {option.optionLabel}
            </label>
          </div>
        ))}
      {type === Type.CHECKBOX &&
        options.map((option) => (
          <div key={option.optionId}>
            <input
              type="checkbox"
              id={`${id}-${option.optionId}`}
              name={`question-${id}`}
              value={option.optionLabel}
            />
            <label htmlFor={`${id}-${option.optionId}`}>
              {option.optionLabel}
            </label>
          </div>
        ))}
      {/* Handle other types similarly */}
    </div>
  );
}
