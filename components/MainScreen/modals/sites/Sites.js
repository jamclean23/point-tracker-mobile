// Sites Modal Component

// ====== IMPORTS ======

// React
import React, { useEffect, useState } from "react";
import { 
    Modal, 
    View, 
    TouchableOpacity, 
    Text, 
    ScrollView, 
    TextInput, 
    TouchableWithoutFeedback, 
    Keyboard, 
    BackHandler 
} from "react-native";

// Styling
import styles from "../../styles";

// Functions
import renderSites from "./functions/renderSites";
import handleSearchTextChange from "./functions/handleSearchTextChange";
import handleSortBtnPress from "./functions/handleSortBtnPress";
import handleSortMenuBtnPress from "./functions/handleSortMenuBtnPress";
import formatSortMethod from "./functions/formatSortMethod";


// ====== FUNCTIONS ======

export default function Sites (props) {

    // == STATE

    const [sitesFilter, setSitesFilter] = useState('');    
    const [shouldShowSortMenu, setShouldShowSortMenu] = useState(false);
    const [sortMethod, setSortMethod] = useState('op');

    

    // == RENDER

    function SortMenu () {
     
        return (
            shouldShowSortMenu
            ? <View style={styles.sortMenu}>

                {/* Subheader */}
                <Text style={styles.sortMenuSubHeader}>Sort By:</Text>

                {/* Operation */}
                <TouchableOpacity
                    style={styles.sortMenuBtn}
                    onPress={() => handleSortMenuBtnPress('op', setSortMethod, setShouldShowSortMenu)}
                >
                    <Text style={styles.sortMenuBtnText}>Operation</Text>
                </TouchableOpacity>

                {/* Client */}
                <TouchableOpacity 
                    style={styles.sortMenuBtn}
                    onPress={() => handleSortMenuBtnPress('client', setSortMethod, setShouldShowSortMenu)}
                >
                    <Text style={styles.sortMenuBtnText}>Client</Text>
                </TouchableOpacity>
            </View>
            : ''
        )
    }

    return (
        <Modal
            animationType="slide"
            visible={props.showSites}
            transparent={true}
            onRequestClose={() => {
                if (shouldShowSortMenu) {
                    setShouldShowSortMenu(false);
                } else {
                    props.handleModalClose(props.setShowSites)
                }
            }}
            style={styles.modal}
        >
            <TouchableWithoutFeedback
                onPress={() => {
                    Keyboard.dismiss();
                    setShouldShowSortMenu(false);
                }}
            >
                <View style={styles.modalView}>
                    
                    {/* Dismiss Button */}
                    <View style={{...styles.modalCloseBtnWrapper}}>
                        <TouchableOpacity style={{...styles.modalCloseBtn}} onPress={() => {props.handleModalClose(props.setShowSites)}}>
                            <Text style={{...styles.closeBtnText}}>X</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Header */}
                    <View style={{...styles.modalHeaderWrapper}}>
                        <Text style={{...styles.modalHeaderText}}>Sites</Text>
                    </View>                

                    {/* SearchBar */}
                    <View style={styles.searchBarWrapper}>
                        <TextInput
                            style={styles.sitesSearchInput}
                            placeholder="Filter..."
                            value={sitesFilter}
                            onChange={(event) => handleSearchTextChange(event, sitesFilter, setSitesFilter)}
                        />
                        <TouchableOpacity
                            style={styles.sortBtn}
                            onPress={() => handleSortBtnPress(shouldShowSortMenu, setShouldShowSortMenu)}
                        >
                            <Text style={styles.sortBtnText}>↑↓</Text>
                        </TouchableOpacity>

                        <SortMenu />

                    </View>
                        
                    {/* Sort method info */}
                    <Text style={styles.sortMethodInfo}>Sorted by: {formatSortMethod(sortMethod)}</Text>

                    {/* Sites in scrollview */}
                    <View style={{...styles.modalContentWrapper}}>
                        <ScrollView style={{...styles.modalScrollContent}}>
                            {renderSites(props.sites, sortMethod, sitesFilter)}
                        </ScrollView>
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>   
    )
}