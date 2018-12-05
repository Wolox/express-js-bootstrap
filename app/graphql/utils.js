exports.getSelectionSet = info =>
  info.fieldNodes[0].selectionSet.selections.map(selection => selection.name.value);
