// Handles input to serach bar on sites filter TextInput

export default function handleSearchTextChange (event, sitesFilter, setSitesFilter) {

    // Fail conditions
    if (
        typeof sitesFilter != 'string'
        || typeof setSitesFilter != 'function'
    ) {
        console.log('Error in parameters of handleSearchTextChange');
        throw new Error('Error in parameters of handleSearchTextChange');
    }

    setSitesFilter(event.nativeEvent.text);
}