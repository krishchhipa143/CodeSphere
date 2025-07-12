import React, { useState, useEffect } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import ActivityBar from "../Components/EditorElements/ActivityBar";
import BottomBar from "../Components/EditorElements/BottomBar";
import FileSidebar from "../Components/EditorElements/FileSidebar";
import ExtensionTab from "../Components/ActivityBarElements/ExtensionTab";
import Topbar from "../Components/EditorElements/Topbar";
import "../codemirror-theme.css";

const defaultHTML = "<!-- HTML -->\n<h1>Hello</h1>";
const defaultCSS = "/* CSS */\nh1 { color: red; }";
const defaultJS = "// JS\nconsole.log('Hello');";

const defaultFiles = [
  { name: "index.html", type: "file", content: defaultHTML },
  { name: "style.css", type: "file", content: defaultCSS },
  { name: "script.js", type: "file", content: defaultJS },
];

const getLanguageExtension = (filename) => {
  if (filename.endsWith(".html")) return html();
  if (filename.endsWith(".css")) return css();
  if (filename.endsWith(".js")) return javascript();
  return html();
};

const STORAGE_KEYS = {
  tree: "tree",
  openFiles: "openFiles",
  activeFile: "activeFile",
  expanded: "expanded",
  contents: "contents",
};

const loadFromStorage = () => {
  return {
    fileTree: JSON.parse(localStorage.getItem(STORAGE_KEYS.tree)) || defaultFiles,
    openFiles: JSON.parse(localStorage.getItem(STORAGE_KEYS.openFiles)) || [],
    activeFile: JSON.parse(localStorage.getItem(STORAGE_KEYS.activeFile)) || "",
    expandedFolders: JSON.parse(localStorage.getItem(STORAGE_KEYS.expanded)) || [],
    fileContents: JSON.parse(localStorage.getItem(STORAGE_KEYS.contents)) || {},
  };
};

const saveToStorage = (fileTree, openFiles, activeFile, expandedFolders, fileContents) => {
  localStorage.setItem(STORAGE_KEYS.tree, JSON.stringify(fileTree));
  localStorage.setItem(STORAGE_KEYS.openFiles, JSON.stringify(openFiles));
  localStorage.setItem(STORAGE_KEYS.activeFile, JSON.stringify(activeFile));
  localStorage.setItem(STORAGE_KEYS.expanded, JSON.stringify(expandedFolders));
  localStorage.setItem(STORAGE_KEYS.contents, JSON.stringify(fileContents));
};

const CodeEditor = () => {
  const loaded = loadFromStorage();
  const [fileTree, setFileTree] = useState(loaded.fileTree);
  const [openFiles, setOpenFiles] = useState(loaded.openFiles);
  const [activeFile, setActiveFile] = useState(loaded.activeFile);
  const [expandedFolders, setExpandedFolders] = useState(loaded.expandedFolders);
  const [fileContents, setFileContents] = useState(loaded.fileContents);
  const [activeBar, setActiveBar] = useState("explorer");
  const [fsRootHandle, setFsRootHandle] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState([]);
  const [clipboard, setClipboard] = useState(null);

  useEffect(() => {
    saveToStorage(fileTree, openFiles, activeFile, expandedFolders, fileContents);
  }, [fileTree, openFiles, activeFile, expandedFolders, fileContents]);

  const updateFileNode = (tree, pathArr, updater) => {
    if (!pathArr.length) return updater({ type: "folder", children: tree }).children;
    return tree.map((f) => {
      if (f.name === pathArr[0]) {
        if (pathArr.length === 1) return updater(f);
        else if (f.type === "folder") {
          return {
            ...f,
            children: updateFileNode(f.children || [], pathArr.slice(1), updater),
          };
        }
      }
      return f;
    });
  };

  const findFileNode = (tree, pathArr) => {
    let node = null, nodes = tree;
    for (let i = 0; i < pathArr.length; i++) {
      node = nodes.find((f) => f.name === pathArr[i]);
      if (!node) return null;
      if (i < pathArr.length - 1) nodes = node.children || [];
    }
    return node;
  };

  const removeFromTree = (tree, pathArr) => {
    return tree.filter((node) => {
      if (node.name === pathArr[0]) {
        if (pathArr.length === 1) return false;
        if (node.children) {
          node.children = removeFromTree(node.children, pathArr.slice(1));
          return true;
        }
      }
      return true;
    });
  };

  const handleContextAction = (action, pathArr) => {
    const pathStr = pathArr.join("/");

    switch (action) {
      case "rename": {
        const newName = prompt("Enter new name:");
        if (!newName) return;
        setFileTree((tree) =>
          updateFileNode(tree, pathArr, (node) => ({ ...node, name: newName }))
        );
        const newPath = [...pathArr.slice(0, -1), newName].join("/");

        if (fileContents[pathStr]) {
          const contents = { ...fileContents };
          contents[newPath] = contents[pathStr];
          delete contents[pathStr];
          setFileContents(contents);
        }

        setOpenFiles((files) => files.map((f) => (f === pathStr ? newPath : f)));
        if (activeFile === pathStr) setActiveFile(newPath);
        break;
      }

      case "delete":
      case "deletePermanent": {
        setFileTree((tree) => removeFromTree(tree, pathArr));
        setOpenFiles((files) => files.filter((f) => f !== pathStr));

        if (fileContents[pathStr]) {
          const contents = { ...fileContents };
          delete contents[pathStr];
          setFileContents(contents);
        }

        if (activeFile === pathStr) setActiveFile("");
        break;
      }

      case "cut":
      case "copy": {
        const node = findFileNode(fileTree, pathArr);
        if (!node) return;
        setClipboard({ type: action, data: node, path: pathArr });
        break;
      }

      case "paste": {
        if (!clipboard) return;
        const targetPath = pathArr;
        const nodeToPaste = JSON.parse(JSON.stringify(clipboard.data));
        let name = nodeToPaste.name;
        let suffix = 1;

        const checkExists = (tree, nameToCheck) => {
          return tree.some((item) => item.name === nameToCheck);
        };

        const parentNode = findFileNode(fileTree, targetPath);
        const siblings = parentNode?.children || fileTree;

        while (checkExists(siblings, name)) {
          name = `${nodeToPaste.name}_copy${suffix++}`;
        }

        nodeToPaste.name = name;

        setFileTree((tree) =>
          updateFileNode(tree, targetPath, (node) => ({
            ...node,
            children: [...(node.children || []), nodeToPaste],
          }))
        );

        if (nodeToPaste.type === "file" && clipboard.type === "copy") {
          const originalPath = clipboard.path.join("/");
          const newPath = [...targetPath, nodeToPaste.name].join("/");
          setFileContents((fc) => ({
            ...fc,
            [newPath]: fc[originalPath] || "",
          }));
        }

        if (clipboard.type === "cut") {
          setFileTree((tree) => removeFromTree(tree, clipboard.path));
          const oldPath = clipboard.path.join("/");
          setOpenFiles((files) => files.filter((f) => f !== oldPath));
          setFileContents((fc) => {
            const updated = { ...fc };
            delete updated[oldPath];
            return updated;
          });
        }

        setClipboard(null);
        break;
      }

      default:
        break;
    }
  };

  const handleFileClick = (pathArr) => {
    const filePath = pathArr.join("/");
    setActiveFile(filePath);
    setOpenFiles((prev) => (prev.includes(filePath) ? prev : [...prev, filePath]));
  };

  const handleFileChange = (value) => {
    if (!activeFile) return;
    setFileContents((prev) => ({ ...prev, [activeFile]: value }));
    setFileTree((tree) =>
      updateFileNode(tree, activeFile.split("/"), (node) => ({
        ...node,
        content: value,
      }))
    );
  };

  const handleTabClose = (filePath) => {
    setOpenFiles((prev) => prev.filter((f) => f !== filePath));
    if (activeFile === filePath) {
      const others = openFiles.filter((f) => f !== filePath);
      setActiveFile(others[0] || "");
    }
  };

  const handleNew = (parentPath, name, type) => {
    if (!name) return;
    const newNode = type === "folder" ? { name, type: "folder", children: [] } : { name, type: "file", content: "" };
    setFileTree((tree) =>
      updateFileNode(tree, parentPath, (node) => ({
        ...node,
        children: [...(node.children || []), newNode],
      }))
    );
    setExpandedFolders((folders) => [...new Set([...folders, parentPath.join("/")])]);
    if (type === "file") {
      const filePath = [...parentPath, name].join("/");
      setActiveFile(filePath);
      setOpenFiles((prev) => (prev.includes(filePath) ? prev : [...prev, filePath]));
      setFileContents((prev) => ({ ...prev, [filePath]: "" }));
    }
  };

  const activeFileObj = activeFile ? findFileNode(fileTree, activeFile.split("/")) : null;
  const extension = activeFileObj ? getLanguageExtension(activeFileObj.name) : html();

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column" }}>
      <Topbar />

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <ActivityBar active={activeBar} onChange={setActiveBar} />

        {activeBar === "explorer" && (
          <FileSidebar
            files={fsRootHandle ? fsFileTree : fileTree}
            onFileClick={handleFileClick}
            activeFile={activeFile}
            onNewFile={(path, name) => handleNew(path, name, "file")}
            onNewFolder={(path, name) => handleNew(path, name, "folder")}
            expandedFolders={expandedFolders}
            setExpandedFolders={setExpandedFolders}
            selectedFolder={selectedFolder}
            setSelectedFolder={setSelectedFolder}
            onContextAction={handleContextAction}
            clipboard={clipboard}
            setClipboard={setClipboard}
            onNewFileOrFolder={handleNew}
          />
        )}

        {activeBar === "extensions" && (
          <div style={{ width: 150, background: "#1e293b", flexShrink: 0 }}>
            <ExtensionTab />
          </div>
        )}

        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div
            style={{
              height: 38,
              display: "flex",
              background: "#23272f",
              borderBottom: "1px solid #23272f",
              flexShrink: 0,
              overflowX: "auto",
            }}
          >
            {openFiles.map((tab) => (
              <div
                key={tab}
                onClick={() => setActiveFile(tab)}
                style={{
                  padding: "0 18px",
                  background: activeFile === tab ? "#1e1e1e" : "transparent",
                  color: activeFile === tab ? "#4fc3f7" : "#bdbdbd",
                  fontWeight: activeFile === tab ? 600 : 400,
                  borderTop: activeFile === tab ? "2.5px solid #4fc3f7" : "2.5px solid transparent",
                  borderRight: "1px solid #23272f",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  userSelect: "none",
                }}
              >
                {tab}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTabClose(tab);
                  }}
                  style={{ marginLeft: 10, cursor: "pointer", userSelect:"none"}}
                >
                  ×
                </span>
              </div>
            ))}
          </div>

          <div
            style={{ flex: 1, overflow: "hidden" }}
            onWheel={(e) => {
              if (e.deltaX !== 0 || e.shiftKey) {
                const target = document.querySelector(".cm-scroller");
                if (target) target.scrollLeft += e.deltaX || e.deltaY;
              }
            }}
          >
            <div style={{ width: "100%", height: "100%", overflow: "auto" }}>
              <CodeMirror
                value={fileContents[activeFile] || ""}
                onChange={handleFileChange}
                height="100%"
                extensions={[extension]}
                basicSetup={{ lineNumbers: true }}
                style={{ fontSize: 15, minWidth: 800 }}
              />
            </div>
          </div>
        </div>
      </div>

      <BottomBar />
    </div>
  );
};

export default CodeEditor;
