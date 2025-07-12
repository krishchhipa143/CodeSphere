import React, { useState, useRef, useEffect } from "react";
import {
  FiFolder,
  FiFile,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

const MENU_OPTIONS = [
  { key: "rename", label: "Rename", shortcut: "F2" },
  { key: "delete", label: "Delete", shortcut: "Del" },
  { key: "cut", label: "Cut", shortcut: "Ctrl+X" },
  { key: "copy", label: "Copy", shortcut: "Ctrl+C" },
  { key: "paste", label: "Paste", shortcut: "Ctrl+V" },
];

const FileSidebar = ({
  files,
  onFileClick,
  activeFile,
  onNewFile,
  onNewFolder,
  expandedFolders,
  setExpandedFolders,
  selectedFolder,
  setSelectedFolder,
  parentPath = [],
  onContextAction,
  clipboard,
  setClipboard,
  onNewFileOrFolder,
}) => {
  const [contextMenu, setContextMenu] = useState(null);
  const contextTarget = useRef(null);
  const [creating, setCreating] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const handler = (e) => {
      if (!contextTarget.current) return;
      if (e.key === "F2") {
        e.preventDefault();
        handleContextAction("rename", contextTarget.current);
      } else if (e.key === "Delete") {
        e.preventDefault();
        if (e.shiftKey)
          handleContextAction("deletePermanent", contextTarget.current);
        else handleContextAction("delete", contextTarget.current);
      } else if (e.ctrlKey && e.key.toLowerCase() === "x") {
        e.preventDefault();
        handleContextAction("cut", contextTarget.current);
      } else if (e.ctrlKey && e.key.toLowerCase() === "c") {
        e.preventDefault();
        handleContextAction("copy", contextTarget.current);
      } else if (e.ctrlKey && e.key.toLowerCase() === "v") {
        e.preventDefault();
        handleContextAction("paste", contextTarget.current);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [contextTarget.current]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".context-menu")) {
        setContextMenu(null);
      }
    };
    if (contextMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  const handleContextAction = (type, pathArr) => {
    setContextMenu(null);
    if (onContextAction) onContextAction(type, pathArr);
  };

  const getPathStr = (arr) => arr.join("/");

  const handleNewFile = () => {
    const path =
      Array.isArray(selectedFolder) && selectedFolder.length
        ? selectedFolder
        : [];
    setCreating({ type: "file", path });
    setNewName("");

    // ✅ Expand the parent folder
    const pathStr = path.join("/");
    setExpandedFolders((prev) =>
      prev.includes(pathStr) ? prev : [...prev, pathStr]
    );
  };

  const handleNewFolder = () => {
    const path =
      Array.isArray(selectedFolder) && selectedFolder.length
        ? selectedFolder
        : [];
    setCreating({ type: "folder", path });
    setNewName("");

    // ✅ Expand the parent folder
    const pathStr = path.join("/");
    setExpandedFolders((prev) =>
      prev.includes(pathStr) ? prev : [...prev, pathStr]
    );
  };

  const renderContextMenu = () =>
    contextMenu && (
      <div
        className="context-menu"
        style={{
          position: "fixed",
          top: contextMenu.y,
          left: contextMenu.x,
          zIndex: 9999,
          minWidth: 180,
          background: "var(--input-bg, #23272f)",
          color: "var(--text-color, #d4d4d4)",
          borderRadius: 6,
          boxShadow: "0 2px 16px #0008",
          padding: "6px 0",
          fontSize: 14,
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        {(contextMenu.path.length === 0
          ? MENU_OPTIONS.filter((opt) => opt.key === "paste")
          : MENU_OPTIONS
        ).map((opt) => (
          <div
            key={opt.key}
            className="context-menu-item"
            onClick={() => {
              if (opt.key === "paste" && !clipboard) return;
              handleContextAction(opt.key, contextMenu.path);
            }}
            style={{
              padding: "6px 14px",
              cursor:
                opt.key === "paste" && !clipboard ? "not-allowed" : "pointer",
              opacity: opt.key === "paste" && !clipboard ? 0.5 : 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{opt.label}</span>
            <span style={{ color: "#888", fontSize: 11 }}>{opt.shortcut}</span>
          </div>
        ))}
        {contextMenu.path.length > 0 && (
          <div
            className="context-menu-item"
            style={{ color: "#e57373", padding: "6px 14px" }}
            onClick={() =>
              handleContextAction("deletePermanent", contextMenu.path)
            }
          >
            Delete Permanently
            <span style={{ float: "right", color: "#888", fontSize: 11 }}>
              Shift+Del
            </span>
          </div>
        )}
      </div>
    );

  const isRoot = parentPath.length === 0;
  const indent = parentPath.length * 16 + 22;

  return (
    <div className="sidebar-explorer">
      {isRoot && (
        <div className="explorer-header">
          <button
            style={iconBtnStyle}
            onClick={handleNewFolder}
            title="New Folder"
          >
            <span style={{ userSelect: "none" }}>📁</span>
          </button>
          <button style={iconBtnStyle} onClick={handleNewFile} title="New File">
            <span style={{ userSelect: "none" }}>📄</span>
          </button>
          <span style={{ userSelect: "none" }}>Files</span>
        </div>
      )}
      <div
        className="explorer-list"
        onClick={(e) => {
          if (e.target === e.currentTarget) setSelectedFolder([]);
        }}
        onContextMenu={(e) => {
          if (e.target === e.currentTarget) {
            e.preventDefault();
            setContextMenu({ x: e.clientX, y: e.clientY, path: [] });
            contextTarget.current = [];
          }
        }}
      >
        {files.map((file) => {
          const thisPath = [...parentPath, file.name];
          const pathStr = getPathStr(thisPath);
          const isSelected = getPathStr(selectedFolder) === pathStr;
          const expanded = expandedFolders.includes(pathStr);

          if (file.type === "folder") {
            return (
              <div key={pathStr}>
                <div
                  className={`explorer-item folder${
                    isSelected ? " selected" : ""
                  }`}
                  style={{ paddingLeft: indent }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedFolder(thisPath);
                    setExpandedFolders((folders) =>
                      folders.includes(pathStr)
                        ? folders.filter((f) => f !== pathStr)
                        : [...folders, pathStr]
                    );
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setContextMenu({
                      x: e.clientX,
                      y: e.clientY,
                      path: thisPath,
                    });
                    contextTarget.current = thisPath;
                  }}
                >
                  <span className="icon">
                    {expanded ? (
                      <FiChevronDown size={15} />
                    ) : (
                      <FiChevronRight size={15} />
                    )}
                  </span>
                  <span className="icon">
                    <FiFolder size={16} />
                  </span>
                  <span>{file.name}</span>
                </div>
                {expanded && (
                  <FileSidebar
                    files={file.children || []}
                    onFileClick={onFileClick}
                    activeFile={activeFile}
                    onNewFile={onNewFile}
                    onNewFolder={onNewFolder}
                    expandedFolders={expandedFolders}
                    setExpandedFolders={setExpandedFolders}
                    selectedFolder={selectedFolder}
                    setSelectedFolder={setSelectedFolder}
                    parentPath={thisPath}
                    onContextAction={onContextAction}
                    clipboard={clipboard}
                    setClipboard={setClipboard}
                    onNewFileOrFolder={onNewFileOrFolder}
                    creating={creating}
                    setCreating={setCreating}
                    newName={newName}
                    setNewName={setNewName}
                  />
                )}
              </div>
            );
          }

          return (
            <div
              key={pathStr}
              className={`explorer-item file${isSelected ? " selected" : ""}`}
              style={{ paddingLeft: indent }}
              onClick={() => {
                onFileClick(thisPath);
                setSelectedFolder(thisPath);
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                setContextMenu({ x: e.clientX, y: e.clientY, path: thisPath });
                contextTarget.current = thisPath;
              }}
            >
              <span className="icon">
                <FiFile size={16} />
              </span>
              <span>{file.name}</span>
            </div>
          );
        })}
        {creating &&
          creating.path.length === parentPath.length &&
          creating.path.every((p, i) => p === parentPath[i]) && (
            <div
              className={`explorer-item ${creating.type}`}
              style={{ paddingLeft: indent }}
            >
              <span className="icon">
                {creating.type === "file" ? (
                  <FiFile size={16} />
                ) : (
                  <FiFolder size={16} />
                )}
              </span>
              <input
                autoFocus
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                onBlur={() => setCreating(null)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && newName.trim()) {
                    onNewFileOrFolder(
                      creating.path,
                      newName.trim(),
                      creating.type
                    );
                    setCreating(null);
                  }
                  if (e.key === "Escape") setCreating(null);
                }}
                style={{
                  flex: 1,
                  background: "transparent",
                  border: "none",
                  color: "var(--text-color, #d4d4d4)",
                  outline: "none",
                  fontSize: 14,
                }}
                placeholder={`New ${
                  creating.type === "file" ? "File" : "Folder"
                }`}
              />
            </div>
          )}
      </div>
      {renderContextMenu()}
    </div>
  );
};

const iconBtnStyle = {
  background: "transparent",
  border: "none",
  color: "#4fc3f7",
  cursor: "pointer",
  padding: 2,
  borderRadius: 4,
  outline: "none",
  fontSize: 16,
};

export default FileSidebar;
