// FormField.jsx - a label + input + error message, so every form looks the same.
// "extra" is optional content shown next to the label (e.g. a "Forgot password?" link).

function FormField({ label, htmlFor, error, extra, children }) {
  return (
    <div className="field">
      <div className="field-label-row">
        <label htmlFor={htmlFor}>{label}</label>
        {extra}
      </div>
      {children}
      {error && (
        <p className="field-error" id={`${htmlFor}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}

export default FormField;
