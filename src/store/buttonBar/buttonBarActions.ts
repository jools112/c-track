export const buttonBarAddFoodActionCreator = () => ({
  type: 'BUTTON_BAR_ADD_FOOD'
});

export const buttonBarSelectDialogActionCreator = (selectedDialog: string) => ({
  type: 'BUTTON_BAR_SELECT_DIALOG_ACTION_CREATOR',
  payload: selectedDialog
});
