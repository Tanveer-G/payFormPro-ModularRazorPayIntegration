let entries = [];

export const addEntry = (entry) => {
  entries.unshift(entry);
};

export const getAllEntries = () => {
  return entries;
};
