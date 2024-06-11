// Handler for button in the sort menu

/**
 * 
 * @param {*} chosen 
 * @param {*} setSortMethod 
 * @param {*} setShouldShowSortMenu 
 */
export default function handleSortMenuBtnPress (chosen, setSortMethod, setShouldShowSortMenu) {
    setSortMethod(chosen);
    setShouldShowSortMenu(false);
}