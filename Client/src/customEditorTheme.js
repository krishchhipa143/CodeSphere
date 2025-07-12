import { EditorView } from "codemirror";

export const customEditorTheme = EditorView.theme({
  "&": {
    backgroundColor: "var(--input-bg)",
    color: "var(--text-color)",
    fontFamily: "var(--font-main), monospace",
    fontSize: "15px",
    border: "none",
  },
  ".cm-content": {
    backgroundColor: "var(--input-bg)",
    color: "var(--text-color)",
  },
  ".cm-gutters": {
    backgroundColor: "var(--input-bg)",
    color: "var(--text-color)",
    border: "none",
  },
  ".cm-tooltip, .cm-tooltip-autocomplete": {
    backgroundColor: "var(--card-bg)",
    color: "var(--text-color)",
    border: "1px solid var(--border-color)",
    boxShadow: "var(--shadow)",
  },
  ".cm-tooltip .cm-completionLabel": {
    color: "var(--text-color)",
  },
  ".cm-tooltip .cm-completionMatchedText": {
    color: "var(--accent)",
    fontWeight: "bold",
  },
  ".cm-tooltip .cm-completionIcon": {
    color: "var(--accent)",
  },
  ".cm-tooltip .cm-completionDetail": {
    color: "var(--text-color)",
    opacity: 0.7,
  },
}, { dark: false });
