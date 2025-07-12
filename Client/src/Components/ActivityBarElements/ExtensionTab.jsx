// src/Components/ActivityBarElements/ExtensionTab.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import extensionList from "../../data/extensionsData";
import {
  installExtension,
  uninstallExtension,
} from "../../Redux/Slices/extensionSlice";

const ExtensionTab = () => {
  const dispatch = useDispatch();
  const installed = useSelector((state) => state.extensions.installed);

  return (
    <div style={{ padding: 14, color: "#fff" }}>
      <h3 style={{ marginBottom: 10 }}>Available Extensions</h3>
      {extensionList.map((ext) => (
        <div
          key={ext.id}
          style={{
            background: "#1e1e1e",
            padding: 12,
            marginBottom: 10,
            borderRadius: 6,
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          <div style={{ fontSize: 18 }}>
            {ext.icon} {ext.name}
          </div>
          <div style={{ fontSize: 14, color: "#ccc" }}>{ext.description}</div>
          {!installed[ext.id] ? (
            <button
              onClick={() => dispatch(installExtension(ext.id))}
              style={{
                marginTop: 6,
                background: "#4fc3f7",
                color: "#000",
                padding: "4px 10px",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              Install
            </button>
          ) : (
            <button
              onClick={() => dispatch(uninstallExtension(ext.id))}
              style={{
                marginTop: 6,
                background: "transparent",
                color: "#f44336",
                border: "1px solid #f44336",
                padding: "4px 10px",
                borderRadius: 4,
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              Uninstall
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ExtensionTab;
