/**
 * Clears the entire task creation form and resets UI components.
 */
function clearForm() {
  clearTextFields();
  resetCategorySelection();
  resetPriorityButtons();
  clearAssignedUsers();
  clearSubtaskList();
  resetAssignedDropdown();
  setDefaultPriority();
}