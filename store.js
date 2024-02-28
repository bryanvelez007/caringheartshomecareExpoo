import { registerInDevtools, Store } from "pullstate";



export const WizardStore = new Store({
  progress: 0,
});

registerInDevtools({
  WizardStore,
});