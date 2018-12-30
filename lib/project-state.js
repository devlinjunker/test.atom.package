'use babel';

/*
 * Test Reading the Atom Project State to figure out what text editors
 * are opened with what dimensions and the files that are open
 */


/**
 * Practice using api to get state info
 * @return {string} stringified json object of editor and pane dimensions etc
 */
export function getState() {
  let state = {};
  state.editors = [];

  let editors = atom.workspace.getTextEditors()
  for (let i = 0; i < editors.length; i++){
    let editor = editors[i];
    state.editors.push({
      path: editor.getPath(),
      dim: {
        w: editor.getWidth(),
        h: editor.getHeight()
      }
    });
  }

  let panes = atom.workspace.getPanes();
  for (let i = 0; i < panes.length; i++){
    let pane = panes[i];
    state.panes
  }

  return JSON.stringify(state);
};





/**
 * Checking serialization for what state info it provides
 * @return {string} stringified deserialized state
 */

export function stateFromSerialization() {
  const serialized = atom.workspace.serialize();

  const container = serialized.paneContainers.center;
  if (container.deserializer !== "PaneContainer") {
      return "Unrecognized Serialization";
  }
  const root = container.root;

  const editorMap = {};
  let editors = atom.workspace.getTextEditors()
  for (let i = 0; i < editors.length; i++){
    let editor = editors[i];
    editorMap[editor.id] = editor;
  }

  return JSON.stringify(root, null, 2)

}




/**
 * Practice using API to get the api schema
 * @return {string} stringified schema object with map for editor and pane
 */
export function getSchema() {
  let schema = {};

  schema.workspace = Object.keys(atom.workspace);

  console.log(atom.workspace);

  let editors = atom.workspace.getTextEditors();
  if(editors[0]) {
    schema.editor = Object.keys(editors[0]);
  }

  let panes = atom.workspace.getPanes();
  if(panes[0]) {
    schema.panes = Object.keys(panes[0]);
  }

  return JSON.stringify(schema, null, 2);
}

/**
 * First testing of getting the project state from API
 * @return {string} Stringified list of panes and editors
 */
export function test() {
  let resp = {};

  let editors = atom.workspace.getTextEditors();
  if(editors && editors[0]) {
    resp.editors = editors.length;
  }

  let panes = atom.workspace.getPanes();
  if(panes) {
    resp.panes = [];
    for(let i = 0; i < panes.length; i++) {
      let pane = panes[i];

      const items = pane.items;
      resp.panes.push({
        items: items.length
      })
    }
  }

  return JSON.stringify(resp, null, 2);
}